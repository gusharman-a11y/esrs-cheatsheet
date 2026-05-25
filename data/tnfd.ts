// TNFD v1.0 Recommended Disclosures
// Source: Recommendations of the Taskforce on Nature-related Financial Disclosures (September 2023)
// https://tnfd.global/recommendations-of-the-tnfd/

export type TnfdPillar = 'G' | 'S' | 'RI' | 'MT'

export interface TnfdDisclosure {
  code: string
  pillar: TnfdPillar
  title: string
  summary: string
}

export const TNFD_DISCLOSURES: TnfdDisclosure[] = [
  // ── GOVERNANCE ───────────────────────────────────────────────────────────────
  {
    code: 'G-A',
    pillar: 'G',
    title: "Board's oversight",
    summary: "Describe the board's oversight of nature-related dependencies, impacts, risks and opportunities.",
  },
  {
    code: 'G-B',
    pillar: 'G',
    title: "Management's role",
    summary: "Describe management's role in assessing and managing nature-related dependencies, impacts, risks and opportunities.",
  },
  {
    code: 'G-C',
    pillar: 'G',
    title: 'Human rights & stakeholder engagement',
    summary: "Describe the organisation's human rights policies and engagement activities, and oversight by the board and management, with respect to Indigenous Peoples, Local Communities, affected and other stakeholders.",
  },

  // ── STRATEGY ─────────────────────────────────────────────────────────────────
  {
    code: 'S-A',
    pillar: 'S',
    title: 'Nature-related risks and opportunities',
    summary: 'Describe the nature-related dependencies, impacts, risks and opportunities the organisation has identified over the short, medium and long term.',
  },
  {
    code: 'S-B',
    pillar: 'S',
    title: 'Effect on business model and strategy',
    summary: 'Describe the effect nature-related dependencies, impacts, risks and opportunities have had on the business model, value chain, strategy and financial planning, and any transition plans in place.',
  },
  {
    code: 'S-C',
    pillar: 'S',
    title: 'Strategy resilience',
    summary: "Describe the resilience of the organisation's strategy to nature-related risks and opportunities, taking into consideration different scenarios.",
  },
  {
    code: 'S-D',
    pillar: 'S',
    title: 'Priority locations',
    summary: 'Disclose the locations of assets and/or activities in direct operations and, where possible, value chains that meet the criteria for priority locations (material and/or sensitive).',
  },

  // ── RISK AND IMPACT MANAGEMENT ───────────────────────────────────────────────
  {
    code: 'RI-A(i)',
    pillar: 'RI',
    title: 'Identification & assessment — direct operations',
    summary: "Describe the organisation's processes for identifying, assessing and prioritising nature-related dependencies, impacts, risks and opportunities in its direct operations.",
  },
  {
    code: 'RI-A(ii)',
    pillar: 'RI',
    title: 'Identification & assessment — value chain',
    summary: "Describe the organisation's processes for identifying, assessing and prioritising nature-related dependencies, impacts, risks and opportunities in its upstream and downstream value chain(s).",
  },
  {
    code: 'RI-B',
    pillar: 'RI',
    title: 'Management of nature-related risks',
    summary: "Describe the organisation's processes for managing nature-related dependencies, impacts, risks and opportunities.",
  },
  {
    code: 'RI-C',
    pillar: 'RI',
    title: 'Integration into overall risk management',
    summary: 'Describe how processes for identifying, assessing, prioritising and monitoring nature-related risks are integrated into and inform the overall risk management processes.',
  },

  // ── METRICS AND TARGETS ──────────────────────────────────────────────────────
  {
    code: 'MT-A',
    pillar: 'MT',
    title: 'Metrics for risks and opportunities',
    summary: 'Disclose the metrics used to assess and manage material nature-related risks and opportunities in line with strategy and risk management process.',
  },
  {
    code: 'MT-B',
    pillar: 'MT',
    title: 'Metrics for dependencies and impacts',
    summary: 'Disclose the metrics used to assess and manage dependencies and impacts on nature, including core global and sector metrics.',
  },
  {
    code: 'MT-C',
    pillar: 'MT',
    title: 'Targets',
    summary: 'Describe the targets and goals used to manage nature-related dependencies, impacts, risks and opportunities and performance against these.',
  },
]

// ESRS → TNFD disclosure mapping
// Methodology: maps ESRS DRs to the most substantively aligned TNFD recommended
// disclosure(s). Only DRs with genuine content overlap are included.
// Source: TNFD v1.0 recommendations (Sep 2023); EFRAG ESRS E4 co-design with TNFD.
export const ESRS_TO_TNFD: Record<string, { codes: string; pillar: TnfdPillar }> = {
  // ESRS 2 — General Disclosures
  'GOV-1':  { codes: 'G-A',      pillar: 'G'  }, // Board oversight
  'GOV-2':  { codes: 'G-B',      pillar: 'G'  }, // Management role
  'GOV-3':  { codes: 'G-A, G-B', pillar: 'G'  }, // Nature governance in incentives/strategy
  'GOV-4':  { codes: 'RI-C',     pillar: 'RI' }, // Due diligence → integration into risk mgmt
  'IRO-1':  { codes: 'RI-A(i)',  pillar: 'RI' }, // Materiality assessment process (direct ops)
  'SBM-2':  { codes: 'G-C',      pillar: 'G'  }, // Stakeholder interests and views
  'SBM-3':  { codes: 'S-A',      pillar: 'S'  }, // Material impacts, risks and opportunities

  // ESRS E3 — Water & Marine Resources
  'E3-1':   { codes: 'RI-B',     pillar: 'RI' }, // Policies → managing nature-related risks
  'E3-2':   { codes: 'RI-B',     pillar: 'RI' }, // Actions → managing nature-related risks
  'E3-3':   { codes: 'MT-C',     pillar: 'MT' }, // Targets for water
  'E3-4':   { codes: 'MT-B',     pillar: 'MT' }, // Water consumption metrics

  // ESRS E4 — Biodiversity & Ecosystems (strongest TNFD overlap; co-designed with TNFD v1.0)
  'E4-1':   { codes: 'S-B',      pillar: 'S'  }, // Transition plan and biodiversity strategy
  'E4-2':   { codes: 'RI-A(i)',  pillar: 'RI' }, // Policies — assessing/prioritising impacts
  'E4-3':   { codes: 'RI-B',     pillar: 'RI' }, // Actions — managing biodiversity risks
  'E4-4':   { codes: 'MT-B',     pillar: 'MT' }, // Biodiversity metrics (impact drivers)
  'E4-5':   { codes: 'MT-C',     pillar: 'MT' }, // Biodiversity targets
}
