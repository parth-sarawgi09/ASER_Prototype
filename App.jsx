import React, { useState, useMemo } from 'react';
import { TrendingDown, TrendingUp, AlertCircle, CheckCircle, AlertTriangle, BarChart3, Minus } from 'lucide-react';

// Sample ASER data for all 6 states (2018, 2022, 2024)
const ASER_DATA = [
  // 2018
  { state: 'Bihar', grade: 3, skill: 'Reading', year: 2018, percentage: 12.3 },
  { state: 'Bihar', grade: 3, skill: 'Arithmetic', year: 2018, percentage: 18 },
  { state: 'Bihar', grade: 5, skill: 'Reading', year: 2018, percentage: 35.1 },
  { state: 'Bihar', grade: 5, skill: 'Arithmetic', year: 2018, percentage: 24.1 },
  { state: 'Uttar Pradesh', grade: 3, skill: 'Reading', year: 2018, percentage: 12.3 },
  { state: 'Uttar Pradesh', grade: 3, skill: 'Arithmetic', year: 2018, percentage: 11.2 },
  { state: 'Uttar Pradesh', grade: 5, skill: 'Reading', year: 2018, percentage: 36.2 },
  { state: 'Uttar Pradesh', grade: 5, skill: 'Arithmetic', year: 2018, percentage: 17 },
  { state: 'Rajasthan', grade: 3, skill: 'Reading', year: 2018, percentage: 10.3 },
  { state: 'Rajasthan', grade: 3, skill: 'Arithmetic', year: 2018, percentage: 8.1 },
  { state: 'Rajasthan', grade: 5, skill: 'Reading', year: 2018, percentage: 39.1 },
  { state: 'Rajasthan', grade: 5, skill: 'Arithmetic', year: 2018, percentage: 14.1 },
  { state: 'Madhya Pradesh', grade: 3, skill: 'Reading', year: 2018, percentage: 10.4 },
  { state: 'Madhya Pradesh', grade: 3, skill: 'Arithmetic', year: 2018, percentage: 8.5 },
  { state: 'Madhya Pradesh', grade: 5, skill: 'Reading', year: 2018, percentage: 34.4 },
  { state: 'Madhya Pradesh', grade: 5, skill: 'Arithmetic', year: 2018, percentage: 16.5 },
  { state: 'Maharashtra', grade: 3, skill: 'Reading', year: 2018, percentage: 44.2 },
  { state: 'Maharashtra', grade: 3, skill: 'Arithmetic', year: 2018, percentage: 28.1 },
  { state: 'Maharashtra', grade: 5, skill: 'Reading', year: 2018, percentage: 66 },
  { state: 'Maharashtra', grade: 5, skill: 'Arithmetic', year: 2018, percentage: 31.7 },
  { state: 'Tamil Nadu', grade: 3, skill: 'Reading', year: 2018, percentage: 11.6 },
  { state: 'Tamil Nadu', grade: 3, skill: 'Arithmetic', year: 2018, percentage: 9.3 },
  { state: 'Tamil Nadu', grade: 5, skill: 'Reading', year: 2018, percentage: 46.3 },
  { state: 'Tamil Nadu', grade: 5, skill: 'Arithmetic', year: 2018, percentage: 27.1 },

  // 2022
  { state: 'Bihar', grade: 3, skill: 'Reading', year: 2022, percentage: 12.9 },
  { state: 'Bihar', grade: 3, skill: 'Arithmetic', year: 2022, percentage: 21.2 },
  { state: 'Bihar', grade: 5, skill: 'Reading', year: 2022, percentage: 37.1 },
  { state: 'Bihar', grade: 5, skill: 'Arithmetic', year: 2022, percentage: 30 },
  { state: 'Uttar Pradesh', grade: 3, skill: 'Reading', year: 2022, percentage: 16.4 },
  { state: 'Uttar Pradesh', grade: 3, skill: 'Arithmetic', year: 2022, percentage: 19.7 },
  { state: 'Uttar Pradesh', grade: 5, skill: 'Reading', year: 2022, percentage: 38.3 },
  { state: 'Uttar Pradesh', grade: 5, skill: 'Arithmetic', year: 2022, percentage: 24.5 },
  { state: 'Rajasthan', grade: 3, skill: 'Reading', year: 2022, percentage: 7.7 },
  { state: 'Rajasthan', grade: 3, skill: 'Arithmetic', year: 2022, percentage: 4.9 },
  { state: 'Rajasthan', grade: 5, skill: 'Reading', year: 2022, percentage: 31.5 },
  { state: 'Rajasthan', grade: 5, skill: 'Arithmetic', year: 2022, percentage: 6.3 },
  { state: 'Madhya Pradesh', grade: 3, skill: 'Reading', year: 2022, percentage: 7.9 },
  { state: 'Madhya Pradesh', grade: 3, skill: 'Arithmetic', year: 2022, percentage: 9.5 },
  { state: 'Madhya Pradesh', grade: 5, skill: 'Reading', year: 2022, percentage: 29.2 },
  { state: 'Madhya Pradesh', grade: 5, skill: 'Arithmetic', year: 2022, percentage: 15.7 },
  { state: 'Maharashtra', grade: 3, skill: 'Reading', year: 2022, percentage: 26.1 },
  { state: 'Maharashtra', grade: 3, skill: 'Arithmetic', year: 2022, percentage: 18.5 },
  { state: 'Maharashtra', grade: 5, skill: 'Reading', year: 2022, percentage: 55.7 },
  { state: 'Maharashtra', grade: 5, skill: 'Arithmetic', year: 2022, percentage: 20.1 },
  { state: 'Tamil Nadu', grade: 3, skill: 'Reading', year: 2022, percentage: 4.7 },
  { state: 'Tamil Nadu', grade: 3, skill: 'Arithmetic', year: 2022, percentage: 9.3 },
  { state: 'Tamil Nadu', grade: 5, skill: 'Reading', year: 2022, percentage: 26 },
  { state: 'Tamil Nadu', grade: 5, skill: 'Arithmetic', year: 2022, percentage: 14.7 },

  // 2024
  { state: 'Bihar', grade: 3, skill: 'Reading', year: 2024, percentage: 20.1 },
  { state: 'Bihar', grade: 3, skill: 'Arithmetic', year: 2024, percentage: 28.2 },
  { state: 'Bihar', grade: 5, skill: 'Reading', year: 2024, percentage: 41.2 },
  { state: 'Bihar', grade: 5, skill: 'Arithmetic', year: 2024, percentage: 32.5 },
  { state: 'Uttar Pradesh', grade: 3, skill: 'Reading', year: 2024, percentage: 27.9 },
  { state: 'Uttar Pradesh', grade: 3, skill: 'Arithmetic', year: 2024, percentage: 31.6 },
  { state: 'Uttar Pradesh', grade: 5, skill: 'Reading', year: 2024, percentage: 50.5 },
  { state: 'Uttar Pradesh', grade: 5, skill: 'Arithmetic', year: 2024, percentage: 31.8 },
  { state: 'Rajasthan', grade: 3, skill: 'Reading', year: 2024, percentage: 12.1 },
  { state: 'Rajasthan', grade: 3, skill: 'Arithmetic', year: 2024, percentage: 10.4 },
  { state: 'Rajasthan', grade: 5, skill: 'Reading', year: 2024, percentage: 37.7 },
  { state: 'Rajasthan', grade: 5, skill: 'Arithmetic', year: 2024, percentage: 12.3 },
  { state: 'Madhya Pradesh', grade: 3, skill: 'Reading', year: 2024, percentage: 14.8 },
  { state: 'Madhya Pradesh', grade: 3, skill: 'Arithmetic', year: 2024, percentage: 13 },
  { state: 'Madhya Pradesh', grade: 5, skill: 'Reading', year: 2024, percentage: 37.5 },
  { state: 'Madhya Pradesh', grade: 5, skill: 'Arithmetic', year: 2024, percentage: 16.9 },
  { state: 'Maharashtra', grade: 3, skill: 'Reading', year: 2024, percentage: 37 },
  { state: 'Maharashtra', grade: 3, skill: 'Arithmetic', year: 2024, percentage: 31.6 },
  { state: 'Maharashtra', grade: 5, skill: 'Reading', year: 2024, percentage: 57.9 },
  { state: 'Maharashtra', grade: 5, skill: 'Arithmetic', year: 2024, percentage: 26.1 },
  { state: 'Tamil Nadu', grade: 3, skill: 'Reading', year: 2024, percentage: 13.2 },
  { state: 'Tamil Nadu', grade: 3, skill: 'Arithmetic', year: 2024, percentage: 27.6 },
  { state: 'Tamil Nadu', grade: 5, skill: 'Reading', year: 2024, percentage: 37.0 },
  { state: 'Tamil Nadu', grade: 5, skill: 'Arithmetic', year: 2024, percentage: 20.2 },
];

export default function EduTrackAI() {
  const [selectedState, setSelectedState] = useState('Bihar');
  const [selectedGrade, setSelectedGrade] = useState(3);
  const [selectedYear, setSelectedYear] = useState(2024);

  const states = ['Bihar', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Maharashtra', 'Tamil Nadu'];

  // Get current metrics
  const currentReadingMetrics = useMemo(() => {
    const reading = ASER_DATA.find(
      item => item.state === selectedState && item.grade === selectedGrade && item.skill === 'Reading' && item.year === selectedYear
    );
    return reading?.percentage || 0;
  }, [selectedState, selectedGrade, selectedYear]);

  const currentArithmeticMetrics = useMemo(() => {
    const arithmetic = ASER_DATA.find(
      item => item.state === selectedState && item.grade === selectedGrade && item.skill === 'Arithmetic' && item.year === selectedYear
    );
    return arithmetic?.percentage || 0;
  }, [selectedState, selectedGrade, selectedYear]);

  // Calculate PP change from Grade 3 to Grade 5
  const readingPPChange = useMemo(() => {
    const g3 = ASER_DATA.find(item => item.state === selectedState && item.grade === 3 && item.skill === 'Reading' && item.year === selectedYear)?.percentage || 0;
    const g5 = ASER_DATA.find(item => item.state === selectedState && item.grade === 5 && item.skill === 'Reading' && item.year === selectedYear)?.percentage || 0;
    return (g5 - g3).toFixed(1);
  }, [selectedState, selectedYear]);

  const arithmeticPPChange = useMemo(() => {
    const g3 = ASER_DATA.find(item => item.state === selectedState && item.grade === 3 && item.skill === 'Arithmetic' && item.year === selectedYear)?.percentage || 0;
    const g5 = ASER_DATA.find(item => item.state === selectedState && item.grade === 5 && item.skill === 'Arithmetic' && item.year === selectedYear)?.percentage || 0;
    return (g5 - g3).toFixed(1);
  }, [selectedState, selectedYear]);

  // Generate AI insight based on updated metrics and trends
  const generateInsight = () => {
    const readingStatus = currentReadingMetrics >= 40 ? 'strong' : currentReadingMetrics >= 20 ? 'moderate' : 'critical';
    const mathStatus = currentArithmeticMetrics >= 25 ? 'strong' : currentArithmeticMetrics >= 15 ? 'moderate' : 'critical';
    const gap = (currentReadingMetrics - currentArithmeticMetrics).toFixed(1);
    const mathSkill = selectedGrade === 3 ? 'subtraction' : 'division';

    if (mathStatus === 'critical') {
      return `Critical ${mathSkill} deficit in ${selectedState}. Grade ${selectedGrade} shows only ${currentArithmeticMetrics}% proficiency. A math-reading gap of ${gap}% indicates an urgent need for targeted numeracy interventions.`;
    } else if (parseFloat(arithmeticPPChange) < 0 && selectedGrade === 5) {
      return `Concerning trend: Grade 5 division proficiency (${currentArithmeticMetrics}%) is lower than Grade 3 subtraction (${(currentArithmeticMetrics - parseFloat(arithmeticPPChange)).toFixed(1)}%). Students struggle transitioning to higher-order arithmetic operations.`;
    } else if (readingStatus === 'strong' && mathStatus === 'strong') {
      return `${selectedState} demonstrates relatively strong performance across reading and arithmetic in ${selectedYear}. A potential case study for successful instructional practices.`;
    } else {
      return `${selectedState} maintains reading (paragraph) at ${currentReadingMetrics}% and arithmetic (${mathSkill}) at ${currentArithmeticMetrics}%. The ${gap}% gap suggests that while reading momentum is present, foundational mathematics requires additional support.`;
    }
  };

  // Risk assessment logic adjusted for new baseline expectations
  const getRiskLevel = (value) => {
    if (value >= 35) return { level: 'good', color: 'bg-green-100', textColor: 'text-green-700', icon: CheckCircle };
    if (value >= 20) return { level: 'caution', color: 'bg-amber-100', textColor: 'text-amber-700', icon: AlertTriangle };
    return { level: 'critical', color: 'bg-red-100', textColor: 'text-red-700', icon: AlertCircle };
  };

  const readingRisk = getRiskLevel(currentReadingMetrics);
  const mathRisk = getRiskLevel(currentArithmeticMetrics);

  const getTrendIcon = (change) => {
    const val = parseFloat(change);
    if (val > 0) return <TrendingUp size={16} className="text-green-600" />;
    if (val < 0) return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-500" />;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 0.5rem 0', color: '#1a1a1a' }}>
            EduTrack AI
          </h1>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            Real-time learning analytics platform for District Education Officers
          </p>
        </div>

        {/* Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '0.5rem' }}>
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '0.5rem' }}>
              Grade
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value={3}>Grade 3</option>
              <option value={5}>Grade 5</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '0.5rem' }}>
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value={2018}>2018</option>
              <option value={2022}>2022</option>
              <option value={2024}>2024</option>
            </select>
          </div>
        </div>

        {/* Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Reading Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #eee',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0, marginBottom: '0.25rem', fontWeight: '600' }}>
                  READING (PARAGRAPH)
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', margin: 0, color: '#1a1a1a' }}>
                  {currentReadingMetrics}%
                </p>
              </div>
              {React.createElement(readingRisk.icon, { size: 24, color: readingRisk.textColor.split('-')[1] === 'green' ? '#10b981' : readingRisk.textColor.split('-')[1] === 'amber' ? '#f59e0b' : '#ef4444' })}
            </div>
            <div style={{
              padding: '0.75rem',
              borderRadius: '6px',
              marginBottom: '1rem',
              ...readingRisk.color ? { backgroundColor: readingRisk.color } : {}
            }}>
              <p style={{ fontSize: '13px', margin: 0, ...readingRisk.textColor ? { color: readingRisk.textColor.replace('text-', '') } : {}, fontWeight: '600' }}>
                Status: {readingRisk.level.toUpperCase()}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '12px', color: '#666' }}>
              {getTrendIcon(readingPPChange)}
              <span>
                {Math.abs(parseFloat(readingPPChange))}% {parseFloat(readingPPChange) >= 0 ? 'higher' : 'lower'} in Grade 5 vs Grade 3
              </span>
            </div>
          </div>

          {/* Arithmetic Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #eee',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0, marginBottom: '0.25rem', fontWeight: '600' }}>
                  ARITHMETIC ({selectedGrade === 3 ? 'SUBTRACTION' : 'DIVISION'})
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', margin: 0, color: '#1a1a1a' }}>
                  {currentArithmeticMetrics}%
                </p>
              </div>
              {React.createElement(mathRisk.icon, { size: 24, color: mathRisk.textColor.split('-')[1] === 'green' ? '#10b981' : mathRisk.textColor.split('-')[1] === 'amber' ? '#f59e0b' : '#ef4444' })}
            </div>
            <div style={{
              padding: '0.75rem',
              borderRadius: '6px',
              marginBottom: '1rem',
              ...mathRisk.color ? { backgroundColor: mathRisk.color } : {}
            }}>
              <p style={{ fontSize: '13px', margin: 0, ...mathRisk.textColor ? { color: mathRisk.textColor.replace('text-', '') } : {}, fontWeight: '600' }}>
                Status: {mathRisk.level.toUpperCase()}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '12px', color: '#666' }}>
              {getTrendIcon(arithmeticPPChange)}
              <span>
                {Math.abs(parseFloat(arithmeticPPChange))}% {parseFloat(arithmeticPPChange) >= 0 ? 'higher' : 'lower'} division (G5) vs subtraction (G3)
              </span>
            </div>
          </div>

          {/* Skill Gap Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #eee',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#999', margin: 0, marginBottom: '0.25rem', fontWeight: '600' }}>
                  READING vs MATH GAP
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', margin: 0, color: '#1a1a1a' }}>
                  {Math.abs(currentReadingMetrics - currentArithmeticMetrics).toFixed(1)}%
                </p>
              </div>
              <BarChart3 size={24} color="#3b82f6" />
            </div>
            <div style={{
              padding: '0.75rem',
              borderRadius: '6px',
              backgroundColor: '#eff6ff'
            }}>
              <p style={{ fontSize: '13px', margin: 0, color: '#1e40af', fontWeight: '600' }}>
                {currentReadingMetrics > currentArithmeticMetrics ? 'Math consistently lower than reading' : 'Math proficiency exceeds reading'}
              </p>
            </div>
            <p style={{ fontSize: '12px', color: '#666', margin: '1rem 0 0 0' }}>
              Indicates specific target areas for intervention
            </p>
          </div>
        </div>

        {/* AI Insight Section */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #eee',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 1rem 0', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '18px' }}>🤖</span> AI-Generated Insight
          </h2>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            margin: 0,
            color: '#333',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            borderLeft: '4px solid #3b82f6'
          }}>
            {generateInsight()}
          </p>
        </div>

        {/* Action Items */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #eee',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 1rem 0', color: '#1a1a1a' }}>
            Recommended Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#fef3c7',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#92400e',
              borderLeft: '4px solid #f59e0b'
            }}>
              ⚠️ Implement foundational "catch-up" camps for arithmetic, as numeracy levels often trail reading capabilities.
            </div>
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#fee2e2',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#7f1d1d',
              borderLeft: '4px solid #ef4444'
            }}>
              🔴 Focus structurally on bridging the gap between basic subtraction and division for intermediate grades.
            </div>
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#ecfdf5',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#065f46',
              borderLeft: '4px solid #10b981'
            }}>
              ✓ Utilize peer-learning methods in states/districts showing steady cross-grade reading progression.
            </div>
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#eff6ff',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#1e3a8a',
              borderLeft: '4px solid #3b82f6'
            }}>
              📊 Establish continuous monitoring to track long-term recovery impacts across all cohorts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}