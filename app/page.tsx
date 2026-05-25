'use client'

import { useState, useMemo } from 'react'
import { DATAPOINTS } from '@/data/datapoints'
import { ESRS_TO_TNFD } from '@/data/tnfd'

const DATA_TYPES = [
  'All', 'Narrative', 'Quantitative', 'Monetary', 'Percentage', 'Identifier', 'Table/Breakdown', 'Date/Time',
]

const STANDARD_META: Record<string, { color: string }> = {
  'ESRS 2': { color: 'bg-slate-600 text-white' },
  'E1':     { color: 'bg-emerald-600 text-white' },
  'E2':     { color: 'bg-violet-600 text-white' },
  'E3':     { color: 'bg-cyan-600 text-white' },
  'E4':     { color: 'bg-lime-600 text-white' },
  'E5':     { color: 'bg-amber-500 text-white' },
  'S1':     { color: 'bg-blue-600 text-white' },
  'S2':     { color: 'bg-indigo-600 text-white' },
  'S3':     { color: 'bg-pink-600 text-white' },
  'S4':     { color: 'bg-orange-600 text-white' },
  'G1':     { color: 'bg-purple-600 text-white' },
}

const TNFD_PILLAR_STYLE: Record<string, string> = {
  G:  'bg-teal-600 text-white',
  S:  'bg-sky-600 text-white',
  RI: 'bg-amber-600 text-white',
  MT: 'bg-emerald-600 text-white',
}

const TNFD_PILLAR_LABEL: Record<string, string> = {
  G:  'Governance',
  S:  'Strategy',
  RI: 'Risk & Impact Mgmt',
  MT: 'Metrics & Targets',
}

const DATA_TYPE_STYLE: Record<string, string> = {
  'Narrative':       'bg-slate-100 text-slate-600',
  'Quantitative':    'bg-blue-50 text-blue-700',
  'Monetary':        'bg-green-50 text-green-700',
  'Percentage':      'bg-amber-50 text-amber-700',
  'Identifier':      'bg-purple-50 text-purple-700',
  'Table/Breakdown': 'bg-orange-50 text-orange-700',
  'Date/Time':       'bg-pink-50 text-pink-700',
}

const STANDARD_GROUPS = [
  { label: 'Cross-cutting', standards: ['ESRS 2'] },
  { label: 'Environmental', standards: ['E1', 'E2', 'E3', 'E4', 'E5'] },
  { label: 'Social',        standards: ['S1', 'S2', 'S3', 'S4'] },
  { label: 'Governance',    standards: ['G1'] },
]

const STANDARD_NAMES: Record<string, string> = {
  'ESRS 2': 'General disclosures',
  'E1':     'Climate change',
  'E2':     'Pollution',
  'E3':     'Water & marine',
  'E4':     'Biodiversity',
  'E5':     'Circular economy',
  'S1':     'Own workforce',
  'S2':     'Value chain workers',
  'S3':     'Affected communities',
  'S4':     'Consumers & end-users',
  'G1':     'Business conduct',
}

export default function Home() {
  const [activeStandard, setActiveStandard] = useState('All')
  const [dataType, setDataType] = useState('All')
  const [conditional, setConditional] = useState('All')
  const [search, setSearch] = useState('')
  const [tnfdOnly, setTnfdOnly] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return DATAPOINTS.filter(dp => {
      if (activeStandard !== 'All' && dp.esrs !== activeStandard) return false
      if (dataType !== 'All' && dp.dataType !== dataType) return false
      if (conditional === 'Mandatory' && dp.conditional !== '') return false
      if (conditional === 'Conditional' && dp.conditional === '') return false
      if (tnfdOnly && !ESRS_TO_TNFD[dp.dr]) return false
      if (q) {
        return (
          dp.description.toLowerCase().includes(q) ||
          dp.id.toLowerCase().includes(q) ||
          dp.dr.toLowerCase().includes(q) ||
          dp.esrs.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [activeStandard, dataType, conditional, search, tnfdOnly])

  const stats = useMemo(() => ({
    total: DATAPOINTS.length,
    mandatory: DATAPOINTS.filter(dp => dp.conditional === '').length,
    conditional: DATAPOINTS.filter(dp => dp.conditional !== '').length,
  }), [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-screen-xl mx-auto px-6 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight">ESRS Cheat Sheet</h1>
              <p className="mt-1 text-slate-400 text-sm">
                European Sustainability Reporting Standards — all 12 standards, Draft Simplified ESRS (November 2025 / EU Omnibus)
              </p>
            </div>
            <div className="flex gap-5 text-xs text-slate-400 shrink-0 pt-1">
              <span><span className="text-white font-semibold">{stats.total}</span> datapoints</span>
              <span><span className="text-white font-semibold">{stats.mandatory}</span> mandatory</span>
              <span><span className="text-white font-semibold">{stats.conditional}</span> conditional</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
            {STANDARD_GROUPS.map(group => (
              <div key={group.label} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-24 shrink-0">{group.label}</span>
                <div className="flex gap-1 flex-wrap">
                  {group.standards.map(s => (
                    <span
                      key={s}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium cursor-pointer ${STANDARD_META[s].color}`}
                      onClick={() => setActiveStandard(s === activeStandard ? 'All' : s)}
                      title={STANDARD_NAMES[s]}
                    >
                      {s}
                      <span className="text-white/60 text-[10px] hidden sm:inline">· {STANDARD_NAMES[s]}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Standard buttons */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setActiveStandard('All')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeStandard === 'All'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {STANDARD_GROUPS.map(group => (
                <span key={group.label} className="flex items-center gap-1">
                  {group.standards.map(s => (
                    <button
                      key={s}
                      onClick={() => setActiveStandard(s === activeStandard ? 'All' : s)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        activeStandard === s
                          ? STANDARD_META[s].color
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <span className="w-px h-4 bg-slate-200 mx-0.5" />
                </span>
              ))}
            </div>

            <div className="flex gap-2 ml-auto flex-wrap items-center">
              <button
                onClick={() => setTnfdOnly(v => !v)}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors border ${
                  tnfdOnly
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-teal-700 border-teal-300 hover:bg-teal-50'
                }`}
                title="Show only disclosures with a TNFD v1.0 mapping (E3, E4, ESRS 2 governance)"
              >
                TNFD-aligned
              </button>
              <select
                value={dataType}
                onChange={e => setDataType(e.target.value)}
                className="text-xs border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                {DATA_TYPES.map(t => (
                  <option key={t} value={t}>{t === 'All' ? 'All data types' : t}</option>
                ))}
              </select>

              <select
                value={conditional}
                onChange={e => setConditional(e.target.value)}
                className="text-xs border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <option value="All">All disclosures</option>
                <option value="Mandatory">Mandatory only</option>
                <option value="Conditional">Conditional only</option>
              </select>

              <input
                type="search"
                placeholder="Search description, DR, ID…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs border border-slate-200 rounded px-3 py-1.5 w-56 focus:outline-none focus:ring-1 focus:ring-slate-400 placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-screen-xl mx-auto px-6 pt-2.5 pb-1">
        <p className="text-xs text-slate-400">
          {filtered.length === DATAPOINTS.length
            ? `Showing all ${DATAPOINTS.length} datapoints`
            : `${filtered.length} of ${DATAPOINTS.length} datapoints`}
          {activeStandard !== 'All' && ` · ${activeStandard}: ${STANDARD_NAMES[activeStandard]}`}
        </p>
      </div>

      {/* Table */}
      <div className="max-w-screen-xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">No datapoints match your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-2.5 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-[72px]">ESRS</th>
                  <th className="text-left py-2.5 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-[76px]">DR</th>
                  <th className="text-left py-2.5 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-[155px]">Datapoint ID</th>
                  <th className="text-left py-2.5 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
                  <th className="text-left py-2.5 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-[125px]">Data Type</th>
                  <th className="text-left py-2.5 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-[110px]">TNFD</th>
                  <th className="text-left py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide w-[220px]">Conditional</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dp, i) => {
                  const meta = STANDARD_META[dp.esrs]
                  return (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 pr-3 align-top">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold leading-none ${meta?.color ?? 'bg-gray-200 text-gray-700'}`}>
                          {dp.esrs}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 align-top text-[11px] font-mono text-slate-600 whitespace-nowrap pt-3">{dp.dr}</td>
                      <td className="py-2.5 pr-3 align-top text-[11px] font-mono text-slate-500 leading-snug pt-3">{dp.id}</td>
                      <td className="py-2.5 pr-3 align-top text-sm text-slate-800 leading-snug">{dp.description}</td>
                      <td className="py-2.5 pr-3 align-top pt-3">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[11px] leading-none ${DATA_TYPE_STYLE[dp.dataType] ?? 'bg-gray-100 text-gray-600'}`}>
                          {dp.dataType}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 align-top pt-3">
                        {ESRS_TO_TNFD[dp.dr] && (() => {
                          const t = ESRS_TO_TNFD[dp.dr]
                          return (
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-[11px] leading-none ${TNFD_PILLAR_STYLE[t.pillar]}`}
                              title={`TNFD ${TNFD_PILLAR_LABEL[t.pillar]}: ${t.codes}`}
                            >
                              {t.codes}
                            </span>
                          )
                        })()}
                      </td>
                      <td className="py-2.5 align-top text-[11px] text-slate-500 leading-snug pt-3">
                        {dp.conditional
                          ? <span className="text-amber-700">{dp.conditional}</span>
                          : <span className="text-slate-300">—</span>
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
