// Mock AI response generator with intelligent pattern matching

const generateTrendData = (baseValue, trend) => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    const variance = Math.random() * 5 - 2.5;
    const trendEffect = trend === 'up' ? i * 0.3 : trend === 'down' ? -i * 0.3 : 0;
    data.push(Math.max(0, baseValue + trendEffect + variance));
  }
  return data;
};

export const generateAIResponse = (query) => {
  const lowerQuery = query.toLowerCase();

  // Pattern: File Disposal / TAT / HQ KPIs
  if (lowerQuery.includes('file disposal') || lowerQuery.includes('disposal rate')) {
    return {
      kpiValues: [
        { name: 'File Disposal Rate', value: '94', unit: '%', subtext: 'as of last update', trend: 'up' }
      ],
      trends: [
        { 
          name: 'File Disposal Rate - 30 Day Trend', 
          data: generateTrendData(90, 'up'), 
          direction: 'up',
          caption: 'Steady improvement over last 30 days'
        }
      ],
      insights: [
        {
          title: 'Performance Analysis',
          content: 'File Disposal Rate has improved by 6% over the last quarter due to streamlined approval workflows and automated reminders.',
          bullets: [
            'Average processing time reduced from 3.2 days to 2.3 days',
            'Backlog reduced by 42% since process automation',
            'Peak efficiency observed in afternoon shifts (2-5 PM)'
          ]
        }
      ],
      suggestions: [
        'Continue automated reminder system for pending files beyond 48 hours',
        'Extend best practices from high-performing divisions to other units'
      ]
    };
  }

  // Pattern: TAT / Turnaround Time
  if (lowerQuery.includes('tat') || lowerQuery.includes('turnaround time') || lowerQuery.includes('median tat')) {
    return {
      kpiValues: [
        { name: 'Median TAT', value: '2.3', unit: 'days', subtext: 'as of last update', trend: 'down' },
        { name: 'TAT SLA Compliance', value: '89', unit: '%', subtext: 'within 3-day target', trend: 'up' }
      ],
      trends: [
        { 
          name: 'Median TAT Trend', 
          data: generateTrendData(2.8, 'down'), 
          direction: 'down',
          caption: 'Consistent reduction over last 30 days'
        }
      ],
      insights: [
        {
          title: 'Why TAT Improved',
          content: 'Median TAT decreased due to enhanced workflow automation and staff training on priority classification.',
          bullets: [
            'High-priority files now processed 40% faster',
            'Queue management algorithm redistributes load dynamically',
            'Weekend catch-up sessions eliminated 18% of backlog'
          ]
        }
      ],
      suggestions: [
        'Maintain current staffing levels during peak submission periods',
        'Implement predictive queue alerts for potential bottlenecks'
      ]
    };
  }

  // Pattern: DPR / Daily Progress Report
  if (lowerQuery.includes('dpr') || lowerQuery.includes('daily progress')) {
    return {
      kpiValues: [
        { name: 'DPR Timeliness', value: '92', unit: '%', subtext: 'submissions on time', trend: 'up' },
        { name: 'DPR Quality Score', value: '88', unit: '%', subtext: 'average quality rating', trend: 'stable' }
      ],
      donuts: [
        { name: 'DPR Timeliness', percentage: 92, label: 'Submitted within deadline', color: '#16a34a' },
        { name: 'DPR Quality', percentage: 88, label: 'Meeting quality standards', color: '#3b82f6' }
      ],
      insights: [
        {
          title: 'DPR Performance Summary',
          content: 'DPR timeliness has improved significantly with mobile app adoption. Quality scores remain consistent across all field divisions.',
          bullets: [
            'Mobile DPR submissions increased by 67%',
            'Late submissions reduced from 15% to 8%',
            'Photo evidence attachment rate at 94%'
          ]
        }
      ],
      suggestions: [
        'Recognize top-performing field teams with timely DPR submissions',
        'Provide targeted training for teams with quality scores below 80%'
      ]
    };
  }

  // Pattern: Behavioural / Competencies
  if (lowerQuery.includes('behavioural') || lowerQuery.includes('competenc') || lowerQuery.includes('initiative') || lowerQuery.includes('teamwork')) {
    return {
      kpiValues: [
        { name: 'Avg Behavioural Score', value: '103', unit: '/120', subtext: 'organization-wide average', trend: 'up' }
      ],
      charts: [
        {
          title: 'Behavioural Competency Breakdown',
          data: [
            { label: 'Initiative', value: 24, unit: '/30' },
            { label: 'Communication', value: 26, unit: '/30' },
            { label: 'Punctuality', value: 28, unit: '/30' },
            { label: 'Teamwork', value: 25, unit: '/30' }
          ],
          label: 'Average scores across all evaluated employees'
        }
      ],
      insights: [
        {
          title: 'Behavioural Competency Insights',
          content: 'Overall behavioural scores show strong performance in punctuality and communication, with opportunities for improvement in initiative-taking.',
          bullets: [
            'Punctuality scores highest across all divisions (93% of max)',
            'Initiative scores vary significantly by role and seniority',
            'Team collaboration ratings improved 12% year-over-year'
          ]
        }
      ],
      suggestions: [
        'Introduce innovation challenges to encourage initiative-taking',
        'Share best practices from high-scoring teams organization-wide'
      ]
    };
  }

  // Pattern: Budget / Cost / Variance
  if (lowerQuery.includes('budget') || lowerQuery.includes('cost') || lowerQuery.includes('variance')) {
    return {
      kpiValues: [
        { name: 'Budget Variance', value: '5.2', unit: '%', subtext: 'below allocated budget', trend: 'down' }
      ],
      trends: [
        { 
          name: 'Budget Variance Trend', 
          data: generateTrendData(6, 'down'), 
          direction: 'down',
          caption: 'Variance decreasing over last 30 days'
        }
      ],
      insights: [
        {
          title: 'Budget Performance',
          content: 'Budget variance reduced through better resource planning and material procurement optimization.',
          bullets: [
            'Material costs reduced by 8% through bulk purchasing',
            'Equipment rental optimization saved 12% of projected costs',
            'No cost overruns in last 3 months across major projects'
          ]
        }
      ],
      suggestions: [
        'Continue quarterly budget review sessions with project managers',
        'Implement predictive costing models for upcoming projects'
      ]
    };
  }

  // Pattern: Milestone / Progress / Schedule
  if (lowerQuery.includes('milestone') || lowerQuery.includes('schedule') || lowerQuery.includes('progress')) {
    return {
      kpiValues: [
        { name: 'Milestone Hit Rate', value: '85', unit: '%', subtext: 'milestones completed on time', trend: 'up' },
        { name: 'Physical Progress Index', value: '78', unit: '%', subtext: 'overall project progress', trend: 'stable' }
      ],
      donuts: [
        { name: 'Milestone Achievement', percentage: 85, label: 'On-time completion rate', color: '#16a34a' }
      ],
      insights: [
        {
          title: 'Schedule Performance',
          content: 'Milestone achievement improved through enhanced coordination and early risk identification.',
          bullets: [
            'Critical path activities monitored daily',
            'Weather-related delays managed proactively',
            'Resource allocation optimized based on milestone priorities'
          ]
        }
      ],
      suggestions: [
        'Maintain buffer periods for critical milestones',
        'Conduct bi-weekly milestone review meetings with stakeholders'
      ]
    };
  }

  // Pattern: Quality / QC / Defects
  if (lowerQuery.includes('quality') || lowerQuery.includes('qc') || lowerQuery.includes('defect') || lowerQuery.includes('non-conformance')) {
    return {
      kpiValues: [
        { name: 'QC Pass Rate', value: '94', unit: '%', subtext: 'first-time pass rate', trend: 'up' },
        { name: 'Quality Non-Conformance', value: '6', unit: '%', subtext: 'defect rate', trend: 'down' }
      ],
      trends: [
        { 
          name: 'QC Pass Rate Trend', 
          data: generateTrendData(90, 'up'), 
          direction: 'up',
          caption: 'Steady improvement in quality metrics'
        }
      ],
      insights: [
        {
          title: 'Quality Assurance Performance',
          content: 'Quality scores improved significantly due to enhanced inspection protocols and worker training programs.',
          bullets: [
            'Defect detection rate increased by 23%',
            'Rework costs reduced by 35%',
            'Quality training completion at 96% organization-wide'
          ]
        }
      ],
      suggestions: [
        'Expand quality audit frequency for high-risk activities',
        'Implement rewards program for zero-defect work packages'
      ]
    };
  }

  // Pattern: Safety / Incidents
  if (lowerQuery.includes('safety') || lowerQuery.includes('incident') || lowerQuery.includes('accident')) {
    return {
      kpiValues: [
        { name: 'Safety Incident Rate', value: '0.8', unit: 'per 1000 hours', subtext: 'last 30 days', trend: 'down' }
      ],
      donuts: [
        { name: 'Safety Compliance', percentage: 98, label: 'Safety protocols followed', color: '#16a34a' }
      ],
      insights: [
        {
          title: 'Safety Performance',
          content: 'Incident rate at lowest level in 2 years due to enhanced safety training and equipment maintenance.',
          bullets: [
            'Zero fatal incidents in last 18 months',
            'PPE compliance at 99.2%',
            'Safety toolbox talks conducted daily at all sites'
          ]
        }
      ],
      suggestions: [
        'Continue monthly safety audits and surprise inspections',
        'Recognize sites with zero incidents for 6+ months'
      ]
    };
  }

  // Pattern: Evidence / Photos / Documentation
  if (lowerQuery.includes('evidence') || lowerQuery.includes('photo') || lowerQuery.includes('documentation') || lowerQuery.includes('completeness')) {
    return {
      kpiValues: [
        { name: 'Evidence Completeness', value: '90', unit: '%', subtext: 'required documentation submitted', trend: 'up' }
      ],
      charts: [
        {
          title: 'Evidence Submission by Type',
          data: [
            { label: 'Photos', value: 94, unit: '%' },
            { label: 'Measurements', value: 88, unit: '%' },
            { label: 'Approvals', value: 92, unit: '%' },
            { label: 'Test Reports', value: 85, unit: '%' }
          ],
          label: 'Documentation completeness across categories'
        }
      ],
      insights: [
        {
          title: 'Evidence Management',
          content: 'Documentation completeness improved with mobile app adoption and automated reminders.',
          bullets: [
            'Photo uploads increased 78% with mobile app',
            'GPS tagging enabled for 96% of evidence',
            'Average submission time reduced from 4 days to 1.5 days'
          ]
        }
      ],
      suggestions: [
        'Add offline mode for remote areas with poor connectivity',
        'Implement image compression to reduce upload times'
      ]
    };
  }

  // Pattern: System / Adoption / Training
  if (lowerQuery.includes('system') || lowerQuery.includes('adoption') || lowerQuery.includes('training') || lowerQuery.includes('login')) {
    return {
      kpiValues: [
        { name: 'System Adoption Rate', value: '88', unit: '%', subtext: 'active users', trend: 'up' },
        { name: 'Training Completion', value: '92', unit: '%', subtext: 'all mandatory modules', trend: 'up' }
      ],
      charts: [
        {
          title: 'System Usage Metrics',
          data: [
            { label: 'Daily Active Users', value: 88, unit: '%' },
            { label: 'Mobile App Adoption', value: 76, unit: '%' },
            { label: 'Feature Utilization', value: 82, unit: '%' },
            { label: 'Help Desk Tickets', value: 23, unit: '' }
          ],
          label: 'System engagement indicators'
        }
      ],
      insights: [
        {
          title: 'Platform Adoption',
          content: 'Prabhaav system adoption exceeds targets, with mobile app usage growing rapidly among field teams.',
          bullets: [
            'Login frequency increased by 34% quarter-over-quarter',
            'Average session duration: 12.5 minutes',
            'Help desk resolution time: <2 hours for 94% of tickets'
          ]
        }
      ],
      suggestions: [
        'Launch advanced training modules for power users',
        'Develop video tutorials for common workflows'
      ]
    };
  }

  // Pattern: Comparison / Division / Team
  if (lowerQuery.includes('compar') || lowerQuery.includes('division') || lowerQuery.includes('team') || lowerQuery.includes('vs') || lowerQuery.includes('versus')) {
    return {
      charts: [
        {
          title: 'Division Performance Comparison',
          data: [
            { label: 'Infrastructure', value: 87, unit: '' },
            { label: 'Construction', value: 82, unit: '' },
            { label: 'Planning', value: 90, unit: '' },
            { label: 'Operations', value: 85, unit: '' }
          ],
          label: 'Overall performance index across divisions'
        }
      ],
      insights: [
        {
          title: 'Comparative Analysis',
          content: 'Performance varies by division based on project complexity and resource allocation. Planning division leads in most KPIs.',
          bullets: [
            'Planning Division: Highest in schedule adherence (92%)',
            'Infrastructure Division: Best safety record (0.3 incidents/1000hrs)',
            'Construction Division: Leading in innovation (23 implementations)',
            'Operations Division: Top budget control (3.2% variance)'
          ]
        }
      ],
      suggestions: [
        'Conduct cross-division knowledge sharing sessions',
        'Identify and replicate best practices from top performers'
      ]
    };
  }

  // Pattern: Trend / Over time / History
  if (lowerQuery.includes('trend') || lowerQuery.includes('over time') || lowerQuery.includes('history') || lowerQuery.includes('change')) {
    return {
      trends: [
        { 
          name: 'Overall Performance Index', 
          data: generateTrendData(82, 'up'), 
          direction: 'up',
          caption: 'Composite performance trending upward over 30 days'
        }
      ],
      insights: [
        {
          title: 'Historical Trends',
          content: 'Organization-wide performance shows consistent improvement across most KPI categories over the evaluation period.',
          bullets: [
            'HQ KPIs improved 8% quarter-over-quarter',
            'Field KPIs showed 12% improvement in DPR quality',
            'Behavioural scores increased by 6% on average',
            'System adoption grew 15% month-over-month'
          ]
        }
      ]
    };
  }

  // Fallback for unclear queries
  return {
    fallback: 'I need more context to provide specific insights. Try asking about specific KPIs like "What is the file disposal rate?" or "Show me DPR quality trends" or "Compare division performance".'
  };
};
