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
// Source: EFRAG–TNFD Correspondence Mapping (2024) + TNFD v1.0 Recommendations (Sep 2023).
// Note: mapping was produced against the original ESRS. Adjustments for Draft Simplified ESRS
// (Nov 2025): GOV-5/E2-6/E3-5/E4-6/E5-6 deleted; MDR-P/A/M/T renamed GDR-P/A/M/T.
// Only DRs with substantive content overlap are included — not loose thematic links.
export const ESRS_TO_TNFD: Record<string, { codes: string; pillar: TnfdPillar }> = {
  // ── ESRS 2: Governance ───────────────────────────────────────────────────────
  'GOV-1':  { codes: 'G-A, G-B',    pillar: 'G'  }, // Board oversight + management role
  'GOV-2':  { codes: 'G-A, G-B',    pillar: 'G'  }, // Info to/from board + management
  'GOV-3':  { codes: 'G-A',         pillar: 'G'  }, // Incentive schemes → board oversight
  'GOV-4':  { codes: 'G-C',         pillar: 'G'  }, // Due diligence → human rights / stakeholders

  // ── ESRS 2: Strategy & IRO ───────────────────────────────────────────────────
  'IRO-1':  { codes: 'RI-A(i), RI-A(ii)', pillar: 'RI' }, // Materiality process: direct ops + VC
  'SBM-1':  { codes: 'S-A',         pillar: 'S'  }, // Business model → nature-related DIROs
  'SBM-2':  { codes: 'G-C',         pillar: 'G'  }, // Stakeholder engagement
  'SBM-3':  { codes: 'S-A, S-B',    pillar: 'S'  }, // Material IROs + effect on strategy

  // ── ESRS 2: General Disclosure Requirements (MDR-P/A/M/T in pre-simplified ESRS) ──
  'GDR-P':  { codes: 'G-B, RI-B',   pillar: 'RI' }, // Policies → management role + risk mgmt
  'GDR-A':  { codes: 'S-B, RI-B',   pillar: 'S'  }, // Actions → strategy + managing risks
  'GDR-T':  { codes: 'MT-C',        pillar: 'MT' }, // Targets → MT-C
  'GDR-M':  { codes: 'MT-A',        pillar: 'MT' }, // Metrics → MT-A (risk/opp metrics)

  // ── E1: Climate change (relevant via climate–nature nexus) ───────────────────
  'E1-1':   { codes: 'S-B',         pillar: 'S'  }, // Transition plan → effect on strategy
  'E1-2':   { codes: 'RI-B',        pillar: 'RI' }, // Policies → managing climate risks
  'E1-3':   { codes: 'S-C, RI-B',   pillar: 'S'  }, // Actions → resilience + risk management
  'E1-4':   { codes: 'MT-C',        pillar: 'MT' }, // Climate targets

  // ── E2: Pollution ────────────────────────────────────────────────────────────
  'E2-1':   { codes: 'S-B',         pillar: 'S'  }, // Policies → effect on strategy
  'E2-2':   { codes: 'S-C, RI-B',   pillar: 'RI' }, // Actions → resilience + risk management
  'E2-3':   { codes: 'MT-C',        pillar: 'MT' }, // Pollution targets
  'E2-4':   { codes: 'MT-A, MT-B',  pillar: 'MT' }, // Pollution metrics (risks + dependencies)
  'E2-5':   { codes: 'MT-B',        pillar: 'MT' }, // Substances of concern → impact metrics

  // ── E3: Water & Marine Resources ─────────────────────────────────────────────
  'E3-1':   { codes: 'S-B, RI-B',   pillar: 'RI' }, // Water policies → strategy + risk mgmt
  'E3-2':   { codes: 'S-C, RI-B',   pillar: 'RI' }, // Water actions → resilience + risk mgmt
  'E3-3':   { codes: 'MT-C',        pillar: 'MT' }, // Water targets
  'E3-4':   { codes: 'MT-A, MT-B',  pillar: 'MT' }, // Water consumption (risk + dependency)

  // ── E4: Biodiversity & Ecosystems (strongest overlap; co-designed with TNFD v1.0) ──
  'E4-1':   { codes: 'S-B, S-C',    pillar: 'S'  }, // Transition plan → strategy + resilience
  'E4-2':   { codes: 'G-C, RI-B',   pillar: 'RI' }, // Policies → human rights + risk mgmt
  'E4-3':   { codes: 'S-C, RI-B',   pillar: 'RI' }, // Actions → resilience + risk management
  'E4-4':   { codes: 'MT-C',        pillar: 'MT' }, // Biodiversity targets
  'E4-5':   { codes: 'MT-A, MT-B',  pillar: 'MT' }, // Biodiversity metrics (risk + dependency)

  // ── E5: Resource use & Circular economy ──────────────────────────────────────
  'E5-1':   { codes: 'S-B',         pillar: 'S'  }, // Resource use policies → strategy
  'E5-2':   { codes: 'S-C, RI-B',   pillar: 'RI' }, // Actions → resilience + risk management
  'E5-3':   { codes: 'S-B',         pillar: 'S'  }, // Resource use targets in strategy
  'E5-4':   { codes: 'MT-A, MT-B',  pillar: 'MT' }, // Resource inflows metrics
  'E5-5':   { codes: 'MT-B',        pillar: 'MT' }, // Resource outflows → dependency metrics

  // ── S3: Affected communities (Indigenous Peoples / Local Communities → TNFD G-C) ─
  'S3-2':   { codes: 'G-C',         pillar: 'G'  }, // Community engagement → Gov-C
  'S3-4':   { codes: 'S-B',         pillar: 'S'  }, // Actions on affected communities

  // ── G1: Business conduct ─────────────────────────────────────────────────────
  'G1-2':   { codes: 'S-B',         pillar: 'S'  }, // Supplier relationships → strategy
  'G1-5':   { codes: 'G-C',         pillar: 'G'  }, // Lobbying → Gov-C (political influence)
}
