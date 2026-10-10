import { BuildingJourney } from '@/components/journey/BuildingJourney';
import { FinalCall } from '@/components/FinalCall';
import {
  AmenitiesSection,
  ArchitectureSection,
  ClosingSection,
  CollaborationSection,
  WorkspaceShowcase,
} from '@/components/sections/HomeSections';

export default function HomePage() {
  return (
    <main>
      <BuildingJourney />
      <WorkspaceShowcase />
      <CollaborationSection />
      <AmenitiesSection />
      <ArchitectureSection />
      <ClosingSection />
      <FinalCall />
    </main>
  );
}
