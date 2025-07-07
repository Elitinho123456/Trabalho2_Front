import React, { useState, useEffect } from 'react';
import type { Hero, Artifact } from '../types';
import { heroApi } from '../services/api';
import { artifactApi } from '../services/api';
import ErrorDisplay from '../components/ErrorDisplay';

interface HeroReport extends Hero {
  artifacts: Artifact[];
}

const ReportsPage: React.FC = () => {
  const [reportData, setReportData] = useState<HeroReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch both heroes and artifacts in parallel
        const [heroes, artifacts] = await Promise.all([
          heroApi.getAll(),
          artifactApi.getAll()
        ]);

        // Process data (client-side "JOIN")
        const heroReports: HeroReport[] = heroes.map(hero => ({
          ...hero,
          artifacts: artifacts.filter(artifact => artifact.heroId === hero.id),
        }));

        setReportData(heroReports);
      } catch (e) {
        console.error("Failed to generate report:", e);
        setError("Could not generate the report. The Arch-Illager may be interfering with our scrying pools!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-press-start text-white mb-6">Hero Reports</h1>
      <p className="text-mc-stone-300 mb-8 max-w-3xl">This report shows each hero and the artifacts they currently have equipped. This is a client-side simulation of a database `INNER JOIN` between Heroes and Artifacts.</p>

      {isLoading && <p className="text-center text-xl text-mc-stone-300">Generating report...</p>}
      {error && <ErrorDisplay title="Reporting Error!" message={error} />}

      {!isLoading && !error && (
        <div className="space-y-8">
          {reportData.map(hero => (
            <div key={hero.id} className="bg-mc-stone-800 bg-opacity-80 rounded-lg p-6 border-2 border-mc-stone-900">
              <h2 className="text-2xl font-press-start text-mc-gold">{hero.name}</h2>
              <div className="flex space-x-6 text-mc-stone-300 mt-2 mb-4">
                <span>Level: <span className="font-bold text-white">{hero.level}</span></span>
                <span>Power: <span className="font-bold text-white">{hero.power}</span></span>
              </div>
              
              <h3 className="font-bold text-mc-stone-200 mt-4 mb-2">Equipped Artifacts:</h3>
              {hero.artifacts.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 pl-2">
                  {hero.artifacts.map(artifact => (
                    <li key={artifact.id} className="text-mc-stone-300">
                      <span className="font-bold text-mc-emerald">{artifact.name}</span>
                      <span className="text-sm italic"> - {artifact.description}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-mc-stone-400 italic">No artifacts equipped.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
