"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, ChevronDown, Check, ArrowRight, CircleHelp, ExternalLink } from 'lucide-react';

type VisaType = {
  key: string;
  label: string;
  category: 'study' | 'visit' | 'business' | 'immigration';
  amount: string;
  duration: string;
  sourceName: string;
  sourceUrl: string;
  note?: string;
};

type Country = {
  code: string;
  name: string;
  flag: string;
  visaTypes: VisaType[];
};

const countries: Country[] = [
  {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    visaTypes: [
      { key: 'uk-student', label: 'Student Visa', category: 'study', amount: '£1,529/month (London) · £1,171/month (outside London), up to 9 months', duration: '28 consecutive days, statement dated within 31 days of application', sourceName: 'GOV.UK — Student visa: money', sourceUrl: 'https://www.gov.uk/student-visa/money', note: 'Dependants: £845/mo (London) or £680/mo (outside), also capped at 9 months.' },
      { key: 'uk-visitor', label: 'Standard Visitor Visa', category: 'visit', amount: 'No fixed amount published', duration: 'No fixed period — officer discretion (≈3 months of statements typically shown)', sourceName: 'GOV.UK — Standard visitor visa', sourceUrl: 'https://www.gov.uk/standard-visitor-visa', note: 'Immigration Rules Appendix V only requires showing you can support yourself and pay for your return journey — no numeric threshold.' },
      { key: 'uk-worker', label: 'Skilled Worker Visa', category: 'immigration', amount: '£1,270', duration: '28 consecutive days', sourceName: 'GOV.UK — Skilled Worker visa', sourceUrl: 'https://www.gov.uk/skilled-worker-visa', note: 'Waived if your certificate of sponsorship confirms your employer will cover costs, or you’ve held a UK visa for 12+ months.' },
    ],
  },
  {
    code: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    visaTypes: [
      { key: 'ca-study', label: 'Study Permit', category: 'study', amount: 'CAD $22,895/year (single applicant, outside Quebec)', duration: 'No fixed holding period — funds must be readily available (GIC, statement, loan or scholarship)', sourceName: 'IRCC — Financial requirements for a study permit', sourceUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/operational-bulletins-manuals/updates/2024-financial-study-permit.html', note: 'Effective 1 Sept 2025, up from CAD $20,635. Amount scales up per accompanying family member.' },
      { key: 'ca-visitor', label: 'Visitor Visa', category: 'visit', amount: 'No fixed amount published', duration: 'No fixed period — ≈3 months of statements commonly requested', sourceName: 'IRCC — Document checklist (IMM 5865)', sourceUrl: 'https://ircc.canada.ca/english/pdf/kits/forms/IMM5865E.pdf' },
      { key: 'ca-express', label: 'Express Entry / PR', category: 'immigration', amount: 'CAD $15,263 (1 person, scales with family size)', duration: 'N/A — lump-sum, unencumbered funds, updated annually (50% of LICO)', sourceName: 'IRCC — Proof of funds (Express Entry)', sourceUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/proof-funds.html', note: 'Exempt if you have a valid job offer or are invited under the Canadian Experience Class.' },
    ],
  },
  {
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    visaTypes: [
      { key: 'us-student', label: 'F1 Student Visa', category: 'study', amount: 'Set by your school’s Form I-20 (tuition + ~1 year living costs)', duration: 'No fixed period — funds must be shown as "readily available"', sourceName: 'Study in the States (DHS/ICE)', sourceUrl: 'https://studyinthestates.dhs.gov/answer/what-is-evidence-of-financial-support', note: 'Acceptable evidence includes bank statements, sponsor letters, or scholarship letters.' },
      { key: 'us-visitor', label: 'B1/B2 Visitor Visa', category: 'visit', amount: 'No fixed amount published', duration: 'No fixed period — officer discretion, part of the 214(b) ties-to-home-country review', sourceName: 'U.S. Department of State — travel.state.gov', sourceUrl: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html' },
      { key: 'us-investor', label: 'Investor Visa (EB-5)', category: 'business', amount: '$1,050,000 standard, or $800,000 in a Targeted Employment Area', duration: 'N/A — investment capital, not a bank statement', sourceName: 'USCIS — EB-5 Immigrant Investor Program', sourceUrl: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/eb-5-immigrant-investor-program', note: 'Set by the EB-5 Reform and Integrity Act of 2022; verify current figure live before relying on it.' },
    ],
  },
  {
    code: 'schengen',
    name: 'Schengen Area (General)',
    flag: '🇪🇺',
    visaTypes: [
      { key: 'sch-general', label: 'Any Schengen Visa', category: 'visit', amount: 'Varies by member state — no single EU-wide figure', duration: 'Varies by member state', sourceName: 'EEAS — Schengen visa requirements', sourceUrl: 'https://www.eeas.europa.eu/sites/default/files/general_schengen_visa_requirments_en.pdf', note: 'The Visa Code (EC 810/2009) requires "sufficient means of subsistence" but each state sets its own figure (e.g. Belgium €45–95/day, Italy sliding scale from €269.60). Select your specific destination country below for exact figures.' },
    ],
  },
  {
    code: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    visaTypes: [
      { key: 'au-student', label: 'Student Visa (Subclass 500)', category: 'study', amount: '12 months’ funds (travel + tuition + living + schooling), or income test AUD $60,000/yr (AUD $70,000 with family)', duration: 'No fixed holding period — funds must be genuinely available', sourceName: 'Department of Home Affairs — Student visa (500)', sourceUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500', note: 'Reformed 10 May 2024 — confirm current figures live before publishing.' },
      { key: 'au-visitor', label: 'Visitor Visa (Subclass 600)', category: 'visit', amount: 'No fixed amount published', duration: 'No fixed period — individual assessment', sourceName: 'Department of Home Affairs — Visitor visa (600)', sourceUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600' },
    ],
  },
  {
    code: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    visaTypes: [
      { key: 'de-student', label: 'Student Visa (Blocked Account)', category: 'study', amount: '€992/month (€11,904/year)', duration: 'Funds locked in a blocked account (Sperrkonto), released monthly', sourceName: 'German Federal Foreign Office (Auswärtiges Amt)', sourceUrl: 'https://www.auswaertiges-amt.de', note: 'Rate tracks the BAföG student-support rate and is reviewed roughly yearly — verify the current figure live.' },
      { key: 'de-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: '≈€45–120/day (unverified against a live primary source)', duration: 'No fixed period', sourceName: 'Auswärtiges Amt', sourceUrl: 'https://www.auswaertiges-amt.de', note: 'Treat as indicative only until confirmed on the live consulate page.' },
    ],
  },
  {
    code: 'fr',
    name: 'France',
    flag: '🇫🇷',
    visaTypes: [
      { key: 'fr-student', label: 'Student Visa', category: 'study', amount: '€877.50/month (effective Aug 2026, pegged to the French minimum wage)', duration: 'Typically 3 months of statements requested', sourceName: 'France-Visas (official)', sourceUrl: 'https://france-visas.gouv.fr/en/etudiant', note: 'Recently increased from €615/month — a major jump, verify live before publishing.' },
      { key: 'fr-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: '≈€120/day, or ≈€65/day if accommodation is prepaid (unverified)', duration: 'No fixed period', sourceName: 'France-Visas (official)', sourceUrl: 'https://france-visas.gouv.fr' },
    ],
  },
  {
    code: 'it',
    name: 'Italy',
    flag: '🇮🇹',
    visaTypes: [
      { key: 'it-student', label: 'Student Visa', category: 'study', amount: '€10,179.85/year (2026/27–2027/28 academic years)', duration: 'Annual lump sum — no monthly breakdown given officially', sourceName: 'Italian Ministry of Foreign Affairs (MAECI)', sourceUrl: 'https://www.esteri.it/en/ministero/sportello_info/domandefrequenti/studiare-in-italia/' },
      { key: 'it-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: '€269.60 flat for 1–5 days (€212.81 pp if traveling together); €44.93/day for 6–10 days; €51.64 + €36.67/day for 11–20 days', duration: 'N/A — official per-day sliding scale, not a monthly balance', sourceName: 'Italian MFA — Financial means required for entry', sourceUrl: 'https://www.esteri.it/en/servizi-opportunita/ingressosoggiornoinitalia/mezzi_finanziari/', note: 'Basis: Ministry of Interior Directive of 1 March 2000.' },
    ],
  },
  {
    code: 'nl',
    name: 'Netherlands',
    flag: '🇳🇱',
    visaTypes: [
      { key: 'nl-student', label: 'Student Visa', category: 'study', amount: '€1,130.77/month (HBO/university) or €928.58/month (secondary/MBO) — 2026 rate', duration: 'Must cover 12 months', sourceName: 'IND — Required amounts', sourceUrl: 'https://ind.nl/en/required-amounts-income-requirements', note: 'Revised every 1 January. Higher amount applies if the sponsor is a third party, not the student.' },
      { key: 'nl-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: '≈€34–55/day (sources disagree, unverified)', duration: 'No fixed period', sourceName: 'IND (official)', sourceUrl: 'https://ind.nl' },
    ],
  },
  {
    code: 'es',
    name: 'Spain',
    flag: '🇪🇸',
    visaTypes: [
      { key: 'es-student', label: 'Student Visa', category: 'study', amount: '100% of IPREM = €600/month (2026) → €6,000 for a 10-month course / €7,200 for 12 months', duration: 'Proportional to actual course length (per Oct 2025 clarification)', sourceName: 'Spain Ministry of Foreign Affairs — IPREM-based requirement', sourceUrl: 'https://www.exteriores.gob.es', note: 'This is the legal minimum; consulates often expect more in practice. Verify the current IPREM value live.' },
      { key: 'es-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: '≈€90/day (≈€900 minimum per visit, unverified)', duration: 'No fixed period', sourceName: 'exteriores.gob.es (official)', sourceUrl: 'https://www.exteriores.gob.es' },
    ],
  },
  {
    code: 'pt',
    name: 'Portugal',
    flag: '🇵🇹',
    visaTypes: [
      { key: 'pt-student', label: 'Student Visa', category: 'study', amount: '≈€760–920/month (pegged to the national minimum wage, in flux for 2026)', duration: '≈1 year of living costs recommended', sourceName: 'AIMA / Portuguese MFA (vistos.mne.gov.pt)', sourceUrl: 'https://vistos.mne.gov.pt/en/short-stay-visas-schengen/required-documentation/means-of-subsistence', note: 'Minimum wage is under review for Jan 2026 — verify live.' },
      { key: 'pt-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: 'See official "means of subsistence" table', duration: 'No fixed period', sourceName: 'Portuguese MFA — Means of subsistence', sourceUrl: 'https://vistos.mne.gov.pt/en/short-stay-visas-schengen/required-documentation/means-of-subsistence' },
    ],
  },
  {
    code: 'be',
    name: 'Belgium',
    flag: '🇧🇪',
    visaTypes: [
      { key: 'be-student', label: 'Student Visa', category: 'study', amount: '€1,062/month (2026/27), ≈€12,744/year', duration: 'Full academic year, via blocked account or financial guarantor', sourceName: 'Belgian Immigration Office (diplomatie.belgium.be)', sourceUrl: 'https://republiquedecoree.diplomatie.belgium.be/en/travel-belgium/visa-belgium/visa-long-stays-over-90-days/student-visa' },
      { key: 'be-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: '€45/day (staying with host/family) or €95/day (hotel)', duration: 'N/A — official per-day reference amount', sourceName: 'Belgian Immigration Office (IBZ) — Reference amounts', sourceUrl: 'https://dofi.ibz.be/en/themes/entry/border-control/entry-schengen-territory/reference-amounts-short-stay' },
    ],
  },
  {
    code: 'se',
    name: 'Sweden',
    flag: '🇸🇪',
    visaTypes: [
      { key: 'se-student', label: 'Student Visa', category: 'study', amount: 'SEK 10,656/month baseline (2026); reduced if food and/or housing is provided', duration: 'Statement must not be older than 4 months before the permit start date', sourceName: 'Migrationsverket (Swedish Migration Agency)', sourceUrl: 'https://www.migrationsverket.se/en/you-want-to-apply/study/higher-education.html', note: 'First tuition instalment must be paid before applying.' },
      { key: 'se-visitor', label: 'Visit Visa', category: 'visit', amount: 'Not researched — no confirmed figure', duration: 'Not confirmed', sourceName: 'Migrationsverket (official)', sourceUrl: 'https://www.migrationsverket.se' },
    ],
  },
  {
    code: 'at',
    name: 'Austria',
    flag: '🇦🇹',
    visaTypes: [
      { key: 'at-student', label: 'Student Visa', category: 'study', amount: '€722.58/month (under 24) or €1,308.39/month (24+) — unverified, tracks Austria’s ASVG minimum subsistence rate', duration: 'Funds shown 12 months in advance', sourceName: 'Austrian migration authority (migration.gv.at)', sourceUrl: 'https://www.migration.gv.at', note: 'Extra funds required if monthly rent exceeds €386.43. Verify live.' },
      { key: 'at-visitor', label: 'Visit Visa', category: 'visit', amount: 'Not researched — no confirmed figure', duration: 'Not confirmed', sourceName: 'migration.gv.at', sourceUrl: 'https://www.migration.gv.at' },
    ],
  },
  {
    code: 'ch',
    name: 'Switzerland',
    flag: '🇨🇭',
    visaTypes: [
      { key: 'ch-student', label: 'Student Visa', category: 'study', amount: 'CHF ≈21,000–24,000/year — varies by canton (e.g. Zurich ≈21,150, Geneva ≈24,000)', duration: '12 months, via a Swiss-domiciled bank', sourceName: 'Cantonal migration office (varies by canton)', sourceUrl: 'https://www.sem.admin.ch', note: 'No single national figure — Switzerland is not bound by the EU/Schengen fund rule for residence permits; confirm with the specific canton.' },
      { key: 'ch-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: 'Not researched — no confirmed figure', duration: 'Not confirmed', sourceName: 'State Secretariat for Migration (SEM)', sourceUrl: 'https://www.sem.admin.ch' },
    ],
  },
  {
    code: 'gr',
    name: 'Greece',
    flag: '🇬🇷',
    visaTypes: [
      { key: 'gr-student', label: 'Student Visa', category: 'study', amount: 'Conflicting figures reported (€300–650/month or €7,200/yr under Law 4251) — no confirmed official figure', duration: 'Not confirmed', sourceName: 'Greek Ministry of Migration & Asylum / local embassy', sourceUrl: 'https://migration.gov.gr', note: 'Do not treat any figure as final — contact the embassy directly.' },
      { key: 'gr-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: 'No fixed amount confirmed', duration: 'Not confirmed', sourceName: 'Greek Ministry of Foreign Affairs', sourceUrl: 'https://www.mfa.gr' },
    ],
  },
  {
    code: 'pl',
    name: 'Poland',
    flag: '🇵🇱',
    visaTypes: [
      { key: 'pl-student', label: 'Student Visa', category: 'study', amount: '≈PLN 800/month (reported, unverified against the primary page)', duration: 'Not confirmed', sourceName: 'gov.pl — Financial resources required for a D-type visa', sourceUrl: 'https://www.gov.pl/web/armenia-en/financial-resources-required-from-the-foreigner-to-enter-poland-on-the-basis-of-d-type-national-visa' },
      { key: 'pl-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: '≈PLN 776/month (Schengen minimum after housing-cost deduction, unverified)', duration: 'No fixed period', sourceName: 'gov.pl (official)', sourceUrl: 'https://www.gov.pl/web/armenia-en/financial-resources-required-from-the-foreigner-to-enter-poland-on-the-basis-of-d-type-national-visa' },
    ],
  },
  {
    code: 'fi',
    name: 'Finland',
    flag: '🇫🇮',
    visaTypes: [
      { key: 'fi-student', label: 'Student Visa', category: 'study', amount: '€800/month', duration: '6 months of bank-statement history requested', sourceName: 'Finnish Immigration Service (Migri)', sourceUrl: 'https://migri.fi/en/income-requirement-for-students', note: 'Waived if the institution formally supports living costs.' },
      { key: 'fi-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: 'Not researched — no confirmed figure', duration: 'Not confirmed', sourceName: 'Migri (official)', sourceUrl: 'https://migri.fi' },
    ],
  },
  {
    code: 'dk',
    name: 'Denmark',
    flag: '🇩🇰',
    visaTypes: [
      { key: 'dk-student', label: 'Student Visa', category: 'study', amount: 'Reported DKK 6,397–7,426/month — figures conflict across sources', duration: 'Not confirmed', sourceName: 'New to Denmark (SIRI — Self-support)', sourceUrl: 'https://nyidanmark.dk/en-GB/Words-and-concepts/SIRI/Self-support---SIRI', note: 'Two different figures were reported — verify live before publishing. Some fee-paying full-degree students are exempt.' },
      { key: 'dk-visitor', label: 'Visit Visa', category: 'visit', amount: 'Not researched — no confirmed figure', duration: 'Not confirmed', sourceName: 'nyidanmark.dk (official)', sourceUrl: 'https://nyidanmark.dk' },
    ],
  },
  {
    code: 'no',
    name: 'Norway',
    flag: '🇳🇴',
    visaTypes: [
      { key: 'no-student', label: 'Student Visa', category: 'study', amount: 'Reported figures conflict significantly (NOK 130,745 / 151,690 / 170,368 per year) — none confirmed', duration: 'Not confirmed', sourceName: 'Norwegian Directorate of Immigration (UDI)', sourceUrl: 'https://www.udi.no/en/want-to-apply/studies/studietillatelse/', note: 'Must be fetched live from UDI — do not publish any of the conflicting figures as final.' },
      { key: 'no-visitor', label: 'Visit Visa', category: 'visit', amount: 'Not researched — no confirmed figure', duration: 'Not confirmed', sourceName: 'UDI (official)', sourceUrl: 'https://www.udi.no' },
    ],
  },
  {
    code: 'cz',
    name: 'Czech Republic',
    flag: '🇨🇿',
    visaTypes: [
      { key: 'cz-student', label: 'Student Visa', category: 'study', amount: '15× existential minimum (CZK 3,130) = CZK 46,950 base, +CZK 6,260 per extra month; e.g. CZK 115,810 for 12 months', duration: 'Formula-based, not a fixed lookback window', sourceName: 'Czech Ministry of Foreign Affairs', sourceUrl: 'https://mzv.gov.cz/jnp/en/information_for_aliens/supporting_documents_overview/financial_means.html', note: 'Under-18 applicants show half.' },
      { key: 'cz-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: 'Not researched — no confirmed figure', duration: 'Not confirmed', sourceName: 'mzv.gov.cz (official)', sourceUrl: 'https://mzv.gov.cz' },
    ],
  },
  {
    code: 'hu',
    name: 'Hungary',
    flag: '🇭🇺',
    visaTypes: [
      { key: 'hu-student', label: 'Student Visa', category: 'study', amount: 'No fixed official amount found (estimates of €500/month–€10,000/year are inconsistent)', duration: 'Not confirmed', sourceName: 'National Directorate-General for Aliens Policing', sourceUrl: 'https://bmbah.hu', note: 'Treat as embassy/consulate discretion until confirmed.' },
      { key: 'hu-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: 'No fixed amount confirmed', duration: 'Not confirmed', sourceName: 'bmbah.hu (official)', sourceUrl: 'https://bmbah.hu' },
    ],
  },
  {
    code: 'mt',
    name: 'Malta',
    flag: '🇲🇹',
    visaTypes: [
      { key: 'mt-student', label: 'Student Visa', category: 'study', amount: 'No fixed official amount found (reported €9,000–€15,000/year, or ~75% of minimum wage — inconsistent)', duration: 'Not confirmed', sourceName: 'Identity Malta — Central Visa Unit', sourceUrl: 'https://identitymalta.com', note: 'Unverified — contact Identity Malta directly.' },
      { key: 'mt-visitor', label: 'Schengen Visit Visa', category: 'visit', amount: 'No fixed amount confirmed', duration: 'Not confirmed', sourceName: 'identitymalta.com (official)', sourceUrl: 'https://identitymalta.com' },
    ],
  },
  {
    code: 'cy',
    name: 'Cyprus',
    flag: '🇨🇾',
    visaTypes: [
      { key: 'cy-student', label: 'Student Visa (National D-visa)', category: 'study', amount: 'No fixed official amount found (reported €7,000–€12,000/year)', duration: 'Not confirmed', sourceName: 'Civil Registry and Migration Department, Cyprus', sourceUrl: 'http://www.moi.gov.cy/moi/crmd/crmd.nsf', note: 'Cyprus is NOT in the Schengen Area — it issues its own national visa, not a Schengen visa.' },
      { key: 'cy-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount confirmed', duration: 'Not confirmed', sourceName: 'Civil Registry and Migration Department', sourceUrl: 'http://www.moi.gov.cy/moi/crmd/crmd.nsf' },
    ],
  },
  {
    code: 'ie',
    name: 'Ireland',
    flag: '🇮🇪',
    visaTypes: [
      { key: 'ie-student', label: 'Student Visa', category: 'study', amount: '€10,000 (courses of 1 year+) or €833/month (6–8 month courses)', duration: '6 months of statement history commonly expected in practice (not stated on the official finance page itself)', sourceName: 'Irish Immigration Service Delivery (INIS)', sourceUrl: 'https://www.irishimmigration.ie/reminder-on-student-finance-requirements-from-30-june-2025/', note: 'Effective 30 June 2025 — this is a recent change, verify live.' },
      { key: 'ie-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount published — general "sufficient funds" standard applies', duration: 'Not confirmed', sourceName: 'irishimmigration.ie (official)', sourceUrl: 'https://www.irishimmigration.ie' },
    ],
  },
  {
    code: 'nz',
    name: 'New Zealand',
    flag: '🇳🇿',
    visaTypes: [
      { key: 'nz-student', label: 'Student Visa', category: 'study', amount: 'NZD $20,000/year (programs 12 months+) or NZD $1,667/month (under 12 months)', duration: 'Not explicitly stated (commonly held ≈6 months, except approved loans/scholarships)', sourceName: 'Immigration New Zealand — Operations Manual', sourceUrl: 'https://www.immigration.govt.nz/opsmanual/76832.htm' },
      { key: 'nz-visitor', label: 'Visitor Visa', category: 'visit', amount: 'NZD $1,000/month, or NZD $400/month if accommodation is prepaid', duration: 'Not fixed in the manual', sourceName: 'Immigration New Zealand — Operations Manual', sourceUrl: 'https://www.immigration.govt.nz/opsmanual/76832.htm', note: 'Applicants pregnant and intending to give birth in NZ must show an additional NZD $9,000.' },
    ],
  },
  {
    code: 'ae',
    name: 'United Arab Emirates (Dubai)',
    flag: '🇦🇪',
    visaTypes: [
      { key: 'ae-visitor', label: 'Tourist / Visit Visa (30–60 day)', category: 'visit', amount: 'No fixed amount for the standard tourist visa', duration: 'N/A', sourceName: 'GDRFA Dubai (official)', sourceUrl: 'https://www.gdrfad.gov.ae/en/services/f9e586fe-0642-11ec-0320-0050569629e8', note: 'A 5-year multi-entry visa commonly cites ≈USD $4,000 (6-month statement) plus a refundable guarantee — unverified live, confirm at icp.gov.ae.' },
      { key: 'ae-business', label: 'Business / Investor Visa', category: 'business', amount: 'No fixed capital threshold for a standard business visit; Golden Visa investment routes start at AED 2,000,000+', duration: 'N/A', sourceName: 'Federal Authority for Identity, Citizenship, Customs & Port Security (ICP)', sourceUrl: 'https://icp.gov.ae/en/' },
    ],
  },
  {
    code: 'qa',
    name: 'Qatar',
    flag: '🇶🇦',
    visaTypes: [
      { key: 'qa-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount found', duration: 'N/A', sourceName: 'Hukoomi (Qatar e-Government)', sourceUrl: 'https://hukoomi.gov.qa/en/topics/visas-and-official-documents', note: 'Only sponsor-side income minimums exist (e.g. QAR 5,000/month for family-visit sponsors) — these do not apply to the visitor.' },
      { key: 'qa-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount found', duration: 'N/A', sourceName: 'Hukoomi (official)', sourceUrl: 'https://hukoomi.gov.qa/en/topics/visas-and-official-documents' },
    ],
  },
  {
    code: 'sa',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    visaTypes: [
      { key: 'sa-visitor', label: 'Visit / Umrah Visa', category: 'visit', amount: 'No fixed amount — not required at application stage', duration: 'N/A', sourceName: 'Saudi e-Visa (MOFA) / Nusuk (Hajj & Umrah)', sourceUrl: 'https://visa.mofa.gov.sa/' },
      { key: 'sa-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount found', duration: 'N/A', sourceName: 'Saudi e-Visa (MOFA)', sourceUrl: 'https://visa.mofa.gov.sa/' },
    ],
  },
  {
    code: 'kw',
    name: 'Kuwait',
    flag: '🇰🇼',
    visaTypes: [
      { key: 'kw-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount found for the applicant', duration: 'N/A', sourceName: 'Kuwait MOI e-Visa', sourceUrl: 'https://evisa.moi.gov.kw/evisakgo/home_e.do', note: 'Sponsor-side minimums exist (KWD 400–800/month) — these are not applicant POF figures.' },
      { key: 'kw-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount found', duration: 'N/A', sourceName: 'Kuwait Embassy — entry visa requirements', sourceUrl: 'https://washington.mofa.gov.kw/en/requirements-for-an-entry-visa/' },
    ],
  },
  {
    code: 'bh',
    name: 'Bahrain',
    flag: '🇧🇭',
    visaTypes: [
      { key: 'bh-visitor', label: 'Visit Visa', category: 'visit', amount: 'Reported BHD 300–500/month regular income, or ≈USD $1,000 ending balance (unverified live)', duration: '3 months of statements commonly requested', sourceName: 'Bahrain eVisa (MOI)', sourceUrl: 'https://www.evisa.gov.bh/', note: 'Confirm the exact figure directly on evisa.gov.bh.' },
      { key: 'bh-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount independently confirmed', duration: 'Not confirmed', sourceName: 'Bahrain eVisa (MOI)', sourceUrl: 'https://www.evisa.gov.bh/' },
    ],
  },
  {
    code: 'om',
    name: 'Oman',
    flag: '🇴🇲',
    visaTypes: [
      { key: 'om-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount — ROP requires funds "to bear the burden of living" without a number', duration: 'N/A', sourceName: 'Royal Oman Police eVisa', sourceUrl: 'https://evisa.rop.gov.om/' },
      { key: 'om-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount found', duration: 'N/A', sourceName: 'Royal Oman Police eVisa', sourceUrl: 'https://evisa.rop.gov.om/' },
    ],
  },
  {
    code: 'tr',
    name: 'Turkey',
    flag: '🇹🇷',
    visaTypes: [
      { key: 'tr-student', label: 'Student Visa', category: 'study', amount: 'No single nationwide figure — commonly USD $3,000–$8,000 depending on the servicing consulate', duration: '≈28 days to 3 months of stable statements (consulate-dependent)', sourceName: 'Turkish Ministry of Foreign Affairs / consulate checklists', sourceUrl: 'https://www.mfa.gov.tr/' },
      { key: 'tr-visitor', label: 'Visit Visa', category: 'visit', amount: 'No single nationwide figure — some consulates reference ≈£400 + £40/day beyond 10 days (example only)', duration: 'Not fixed nationally', sourceName: 'Turkish Ministry of Foreign Affairs', sourceUrl: 'https://www.mfa.gov.tr/', note: 'Requirement varies by consulate and nationality — verify with the consulate handling your application.' },
    ],
  },
  {
    code: 'il',
    name: 'Israel',
    flag: '🇮🇱',
    visaTypes: [
      { key: 'il-visitor', label: 'Visit Visa (ETA-IL)', category: 'visit', amount: 'No fixed amount published', duration: '≈3 months of statements may be requested', sourceName: 'Population and Immigration Authority — ETA-IL', sourceUrl: 'https://israel-entry.piba.gov.il/', note: 'ETA-IL has been mandatory for most visa-exempt nationals since Jan 2025.' },
      { key: 'il-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount found', duration: 'Not confirmed', sourceName: 'Population and Immigration Authority (PIBA)', sourceUrl: 'https://www.gov.il/en/departments/population_and_immigration_authority' },
    ],
  },
  {
    code: 'jo',
    name: 'Jordan',
    flag: '🇯🇴',
    visaTypes: [
      { key: 'jo-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount published', duration: 'Not confirmed', sourceName: 'Jordan Ministry of Interior — e-Visa', sourceUrl: 'https://visa.moi.gov.jo/' },
      { key: 'jo-business', label: 'Business Visa', category: 'business', amount: 'No fixed personal figure — long-term investor routes go through JIC with project-based thresholds', duration: 'N/A', sourceName: 'Jordan Investment Commission (JIC)', sourceUrl: 'https://jic.gov.jo/' },
    ],
  },
  {
    code: 'za',
    name: 'South Africa',
    flag: '🇿🇦',
    visaTypes: [
      { key: 'za-student', label: 'Study Visa', category: 'study', amount: 'No fixed rand figure — must show ability to cover tuition + living costs (bank statements, sponsor letter, or bursary award)', duration: 'Not officially fixed; proof must cover the full study duration', sourceName: 'Department of Home Affairs / South African Embassy', sourceUrl: 'https://www.dha.gov.za', note: 'Combined with proof of tuition/accommodation prepayment or sponsorship — no single official rand threshold found.' },
      { key: 'za-visitor', label: 'Visitor Visa', category: 'visit', amount: 'R3,000 per person, per month of intended stay (e.g. ≈R9,000 for 3 months)', duration: '3 months of bank-certified statements', sourceName: 'Embassy of South Africa — Visitor’s Visa checklist', sourceUrl: 'https://www.saembassy.org/visas/civic_immigration/visitor_visa/port_of_entry_90days/' },
    ],
  },
  {
    code: 'gh',
    name: 'Ghana',
    flag: '🇬🇭',
    visaTypes: [
      { key: 'gh-student', label: 'Study Visa', category: 'study', amount: 'No fixed amount — requires a letter from the institution confirming financial means', duration: 'Not officially specified', sourceName: 'Ghana Immigration Service', sourceUrl: 'https://gis.gov.gh/permits-and-visas/' },
      { key: 'gh-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount — "evidence of sufficient funds" at officer discretion', duration: 'Not officially specified', sourceName: 'Ghana Immigration Service / eVisa portal', sourceUrl: 'https://evisa.immigration.gov.gh/visa-requirements' },
    ],
  },
  {
    code: 'ke',
    name: 'Kenya',
    flag: '🇰🇪',
    visaTypes: [
      { key: 'ke-visitor', label: 'Visit Visa (eTA)', category: 'visit', amount: 'No fixed amount published', duration: 'Not officially specified', sourceName: 'Directorate of Immigration Services — eTA portal', sourceUrl: 'https://www.etakenya.go.ke' },
      { key: 'ke-business', label: 'Business / Trade Permit (Class G)', category: 'business', amount: 'USD $100,000 minimum documented investment capital', duration: 'N/A — capital proof, not a bank-statement period', sourceName: 'Directorate of Immigration Services — Class G permit', sourceUrl: 'https://immigration.go.ke/class-g-specific-trade-business-or-consultancy/', note: 'This is a trade/consultancy work permit requirement, distinct from a short business-visit visa (which has no published figure).' },
    ],
  },
  {
    code: 'eg',
    name: 'Egypt',
    flag: '🇪🇬',
    visaTypes: [
      { key: 'eg-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount published', duration: 'Not officially specified', sourceName: 'Egypt e-Visa (official portal)', sourceUrl: 'https://visa2egypt.gov.eg' },
      { key: 'eg-business', label: 'Business Visa', category: 'business', amount: 'No personal figure — requires a company letter and financial guarantee from the sponsoring company', duration: 'Not officially specified', sourceName: 'Egypt Embassy — visa requirements', sourceUrl: 'https://www.egyptembassy.org/travel/visa-requirements' },
    ],
  },
  {
    code: 'ma',
    name: 'Morocco',
    flag: '🇲🇦',
    visaTypes: [
      { key: 'ma-visitor', label: 'Visit Visa', category: 'visit', amount: 'Not independently verifiable this pass — the official consulate portal blocked automated access', duration: 'Not confirmed', sourceName: 'Consulate of Morocco', sourceUrl: 'https://consulat.ma/en/ordinary-visas', note: 'Recommend direct confirmation with a Moroccan consulate before publishing a figure.' },
    ],
  },
  {
    code: 'rw',
    name: 'Rwanda',
    flag: '🇷🇼',
    visaTypes: [
      { key: 'rw-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount — DGIE requires "sufficient funds to cover the costs of stay"', duration: 'Not officially specified', sourceName: 'Directorate General of Immigration and Emigration', sourceUrl: 'https://www.migration.gov.rw/visa/visitors-visa' },
      { key: 'rw-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount found', duration: 'Not officially specified', sourceName: 'Directorate General of Immigration and Emigration', sourceUrl: 'https://www.migration.gov.rw' },
    ],
  },
  {
    code: 'ug',
    name: 'Uganda',
    flag: '🇺🇬',
    visaTypes: [
      { key: 'ug-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount published', duration: 'Not officially specified', sourceName: 'Uganda Directorate of Citizenship and Immigration Control', sourceUrl: 'https://visas.immigration.go.ug/' },
      { key: 'ug-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount published', duration: 'Not officially specified', sourceName: 'Uganda Directorate of Citizenship and Immigration Control', sourceUrl: 'https://visas.immigration.go.ug/' },
    ],
  },
  {
    code: 'my',
    name: 'Malaysia',
    flag: '🇲🇾',
    visaTypes: [
      { key: 'my-student', label: 'Student Visa', category: 'study', amount: 'No fixed figure on the official EMGS page — a "Personal Bond" is guaranteed by the institution instead of a personal balance', duration: 'Not specified officially', sourceName: 'Education Malaysia Global Services (EMGS)', sourceUrl: 'https://visa.educationmalaysia.gov.my/guidelines/required-documents', note: 'The commonly cited MYR 40,000/year figure is NOT confirmed on the official EMGS page.' },
      { key: 'my-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount — "proof of sufficient funds" required without a minimum', duration: 'Not specified officially', sourceName: 'Malaysian Immigration Department', sourceUrl: 'https://www.imi.gov.my/index.php/en/main-services/visa/' },
    ],
  },
  {
    code: 'sg',
    name: 'Singapore',
    flag: '🇸🇬',
    visaTypes: [
      { key: 'sg-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount published by ICA', duration: 'Not specified officially', sourceName: 'Immigration & Checkpoints Authority (ICA)', sourceUrl: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore' },
      { key: 'sg-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount — same Short-Term Visit Pass standard as tourists, plus an invitation letter', duration: 'Not specified officially', sourceName: 'Immigration & Checkpoints Authority (ICA)', sourceUrl: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore' },
    ],
  },
  {
    code: 'in',
    name: 'India',
    flag: '🇮🇳',
    visaTypes: [
      { key: 'in-visitor', label: 'Visit Visa (e-Tourist)', category: 'visit', amount: 'No fixed amount published — MHA guidance requires "sufficient funds" without a number', duration: 'Not specified officially', sourceName: 'Ministry of Home Affairs (India) — e-Visa Annex III', sourceUrl: 'https://www.mha.gov.in/PDF_Other/AnnexIII_01022018.pdf' },
      { key: 'in-business', label: 'Business Visa', category: 'business', amount: 'No personal figure for a standard business visa (a separate INR 10–25 crore threshold applies only to the investor e-Business Visa category)', duration: 'Not specified officially', sourceName: 'Ministry of Home Affairs (India)', sourceUrl: 'https://www.mha.gov.in/PDF_Other/AnnexIII_01022018.pdf', note: 'Do not confuse the investor-visa capital threshold with the general business-visa requirement.' },
    ],
  },
  {
    code: 'cn',
    name: 'China',
    flag: '🇨🇳',
    visaTypes: [
      { key: 'cn-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed amount — a financial certificate is only required for self-funded trips; sponsored trips use the inviting party’s finances', duration: '6 months of statements, only when applicable', sourceName: 'Chinese Embassy (checklist varies by servicing post)', sourceUrl: 'https://us.china-embassy.gov.cn/eng/lsfw/zj/qz2021/202509/t20250920_11712385.htm', note: 'Confirm with the specific Chinese consulate serving Nigeria — requirements vary by post.' },
      { key: 'cn-business', label: 'Business Visa', category: 'business', amount: 'No fixed amount found', duration: 'Not specified officially', sourceName: 'Chinese Embassy (official)', sourceUrl: 'https://us.china-embassy.gov.cn' },
    ],
  },
  {
    code: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    visaTypes: [
      { key: 'jp-student', label: 'Student Visa', category: 'study', amount: 'No fixed nationwide figure — a bank certificate is sized to your actual tuition plus ≈1 year of living costs', duration: 'Certificate must be recent, covering the intended enrollment period', sourceName: 'Study in Japan (JASSO / MEXT)', sourceUrl: 'https://www.studyinjapan.go.jp/en/planning/immigration-procedures/' },
      { key: 'jp-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed nationwide minimum published', duration: '≈3 months of statements commonly requested', sourceName: 'Embassy of Japan in Nigeria', sourceUrl: 'https://www.ng.emb-japan.go.jp/itpr_en/00_000092.html' },
    ],
  },
  {
    code: 'kr',
    name: 'South Korea',
    flag: '🇰🇷',
    visaTypes: [
      { key: 'kr-student', label: 'Student Visa', category: 'study', amount: 'No fixed nationwide figure — sized to tuition and living costs; some embassies set their own minimum', duration: 'Certificates commonly issued within 30 days of application', sourceName: 'Study in Korea / Embassy of Korea in Nigeria', sourceUrl: 'https://www.studyinkorea.go.kr' },
      { key: 'kr-visitor', label: 'Visit Visa', category: 'visit', amount: 'No fixed nationwide minimum published', duration: '6 months of statements, issued within 14 days of application', sourceName: 'Embassy of the Republic of Korea to Nigeria', sourceUrl: 'https://overseas.mofa.go.kr/ng-en/' },
    ],
  },
  {
    code: 'th',
    name: 'Thailand',
    flag: '🇹🇭',
    visaTypes: [
      { key: 'th-visitor', label: 'Visit Visa', category: 'visit', amount: 'THB 20,000 per person / THB 40,000 per family (Tourist Visa); THB 10,000 / THB 20,000 for Visa-on-Arrival', duration: '3 months of bank statements showing the closing balance (or a sponsorship letter)', sourceName: 'Royal Thai Embassy / Thai Ministry of Interior notification', sourceUrl: 'https://www.mfa.go.th', note: 'Reinstated May 2025 — confirm at the specific Thai embassy/consulate serving Nigeria.' },
    ],
  },
  {
    code: 'other',
    name: 'Other Country',
    flag: '🌍',
    visaTypes: [
      { key: 'other-general', label: 'Any Visa Type', category: 'visit', amount: 'Varies', duration: 'Varies', sourceName: 'Contact our POF officer', sourceUrl: 'https://wa.link/a8pskc', note: 'Chat with a POF officer for the exact figure required by your specific embassy or consulate.' },
    ],
  },
];

const pofOptions: Record<VisaType['category'], {
  title: string;
  who: string;
  how: string;
  get: string;
}> = {
  study: {
    title: 'POF for Study / Tuition & Living Allowance',
    who: 'Students who have an admission letter or intend to apply for a student visa and need to show funds for tuition and living costs.',
    how: 'We place the required amount in your account (or a linked account) so your bank statement shows a healthy, verifiable balance that meets your school and embassy\'s minimum requirement for the number of months they ask for.',
    get: 'Share your target country, course, and required amount with us on WhatsApp. Once your KYC and account details are verified, funds are credited and your statement is ready within 24 hours.',
  },
  visit: {
    title: 'POF for Visit / Tourist & Family Sponsorship',
    who: 'Anyone applying for a visitor, tourist, or family-sponsorship visa who needs to prove they can fund their trip and will not become a financial burden abroad.',
    how: 'Funds are deposited to reflect steady account activity and a closing balance in line with what the consulate expects, held for the number of days your visa category requires.',
    get: 'Tell us your destination and travel dates. We match you with the right amount and duration, then process the statement ahead of your appointment.',
  },
  business: {
    title: 'POF for Liquidation of Investment / Business & Trade',
    who: 'Business owners, investors, or traders who need to show liquid capital for contracts, trade financing, expansion, or an investor-class visa.',
    how: 'We fund your account (or your company account) with the capital amount required, structured to look like proceeds from a liquidated investment or available business capital, verifiable by the receiving institution.',
    get: 'Send us your company documents, the purpose of the funds, and the amount needed. Larger business amounts may require additional documentation and a short lead time.',
  },
  immigration: {
    title: 'POF for Immigration / Skilled Worker & PR',
    who: 'Applicants for permanent residency, skilled worker, or points-based immigration routes that set a fixed settlement or maintenance funds threshold.',
    how: 'We ensure the exact threshold amount set by the immigration authority is reflected and held in your account for the required minimum period before you submit your application.',
    get: 'Confirm your visa category and family size with our team, since immigration thresholds often scale per dependent, then we structure the funding and statement accordingly.',
  },
};

const categoryOrder: VisaType['category'][] = ['study', 'visit', 'business', 'immigration'];

export default function StepGuidesPage() {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaType | null>(null);

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setSelectedVisa(null);
    setStep(2);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find((c) => c.code === e.target.value);
    if (country) selectCountry(country);
  };

  const selectVisa = (visa: VisaType) => {
    setSelectedVisa(visa);
    setStep(3);
    setTimeout(() => {
      document.getElementById('step-3')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const resetChoice = () => {
    setSelectedCountry(null);
    setSelectedVisa(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#F3F0FF] pb-24 font-sans text-[#120E00]">
      {/* Header Section */}
      <div className="bg-[#2E1499] text-white pt-20 pb-32 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-blue-200 mb-4 font-medium flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span>STEP Guides</span>
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">STEP Guides</h1>
          <p className="text-indigo-100 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Select your destination country and visa type to see exactly how much Proof of Funds you need, and for how many months — sourced from official government guidance.
          </p>
        </div>
      </div>

      {/* Wizard Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 border border-slate-100">

          {/* Step 1: Country */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2E1499] text-white text-sm font-bold shrink-0">1</span>
              <h2 className="text-xl font-bold">Where are you going?</h2>
            </div>
            <div className="relative max-w-md">
              <select
                value={selectedCountry?.code ?? ''}
                onChange={handleCountryChange}
                className="w-full px-4 py-3 sm:py-4 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E1499] transition-all bg-white appearance-none cursor-pointer text-base font-medium text-slate-700"
              >
                <option value="" disabled>Select a country</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDown size={20} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Step 2: Visa Type */}
          {selectedCountry && (
            <div className="mt-10 pt-10 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2E1499] text-white text-sm font-bold shrink-0">2</span>
                <h2 className="text-xl font-bold">What visa type is it?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCountry.visaTypes.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => selectVisa(v)}
                    className={`flex items-center justify-between gap-2 px-4 py-3 rounded-lg border text-left font-medium transition-all ${
                      selectedVisa?.key === v.key
                        ? 'border-[#2E1499] bg-[#F3F0FF] text-[#2E1499]'
                        : 'border-slate-200 hover:border-[#2E1499] text-slate-700'
                    }`}
                  >
                    <span className="text-sm">{v.label}</span>
                    {selectedVisa?.key === v.key && <Check size={18} className="shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {selectedVisa && selectedCountry && (
            <div id="step-3" className="mt-10 pt-10 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2E1499] text-white text-sm font-bold shrink-0">3</span>
                <h2 className="text-xl font-bold">Your POF requirement</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-[#fcfafc] border border-slate-100 rounded-xl p-6 md:p-8 text-center shadow-sm">
                  <p className="text-sm font-semibold text-[#2E1499] mb-4">Required Amount</p>
                  <p className="text-lg md:text-xl font-black text-slate-700 leading-snug">
                    {selectedVisa.amount}
                  </p>
                </div>
                <div className="bg-[#fcfafc] border border-slate-100 rounded-xl p-6 md:p-8 text-center shadow-sm">
                  <p className="text-sm font-semibold text-[#2E1499] mb-4">Bank Statement Duration</p>
                  <p className="text-lg md:text-xl font-black text-slate-700 leading-snug">
                    {selectedVisa.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <ExternalLink size={13} className="shrink-0" />
                <span>
                  Source:{' '}
                  <a href={selectedVisa.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline">
                    {selectedVisa.sourceName}
                  </a>
                </span>
              </div>

              {selectedVisa.note && (
                <div className="flex items-start gap-2 bg-[#e8f7fa] text-slate-700 text-sm p-4 rounded-lg mb-6 border border-blue-50">
                  <CircleHelp size={18} className="shrink-0 mt-0.5 text-blue-500" />
                  <span>{selectedVisa.note} Figures change without notice — confirm the current amount with the official source above and with our POF officer.</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.link/a8pskc"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#2E1499] hover:bg-black text-white font-bold py-4 rounded-lg transition-colors text-base"
                >
                  Proceed on WhatsApp <ArrowRight size={18} />
                </a>
                <button
                  onClick={resetChoice}
                  className="px-6 py-4 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* POF Options Explained */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E1499] mb-2 text-center">POF Options Available For You</h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
          Every visa or transaction calls for a different kind of Proof of Funds. Here is how each one works, who needs it, and how to get it.
        </p>

        <div className="space-y-6">
          {categoryOrder.map((cat) => {
            const opt = pofOptions[cat];
            const isMatch = selectedVisa?.category === cat;
            return (
              <div
                key={cat}
                className={`bg-white rounded-xl p-6 sm:p-8 border ${isMatch ? 'border-[#2E1499] ring-2 ring-[#2E1499]/20' : 'border-slate-100'}`}
              >
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2E1499]">{opt.title}</h3>
                  {isMatch && (
                    <span className="text-xs font-semibold bg-[#2E1499] text-white px-3 py-1 rounded-full">Matches your selection</span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Who needs it</p>
                    <p className="text-slate-600 leading-relaxed">{opt.who}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">How it works</p>
                    <p className="text-slate-600 leading-relaxed">{opt.how}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">How to get it</p>
                    <p className="text-slate-600 leading-relaxed">{opt.get}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How POF Works */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-[#2E1499] text-white rounded-2xl p-6 sm:p-10 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">How Proof of Funds Works</h2>
          <p className="text-indigo-100 leading-relaxed mb-8">
            POFNG lends you the funds you need for the exact number of months your visa or transaction requires. Here is the process, in plain terms:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-6">
              <p className="font-bold mb-2">1. We fund your account</p>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Once your amount and duration are confirmed, the required POF is credited to your account (or a linked account) so your statement reflects it.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <p className="font-bold mb-2">2. Monthly interest, monthly count</p>
              <p className="text-indigo-100 text-sm leading-relaxed">
                You pay the agreed interest rate monthly. Every month you hold the funds counts as 30 days.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <p className="font-bold mb-2">3. Short-term option available</p>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Need it for less than a month? We also offer a minimum 2-week (15-day) retention for quicker turnarounds.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <p className="font-bold mb-2">4. Extend anytime</p>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Still need the funds after the initial period? You can extend your fund retention month by month for as long as you need it.
              </p>
            </div>
          </div>

          <a
            href="https://wa.link/a8pskc"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-white text-[#2E1499] font-bold px-8 py-4 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Chat Our POF Officer <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
