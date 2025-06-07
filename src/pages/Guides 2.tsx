import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import TriageCard from '../components/TriageCard';

// Sample guides for the MVP
const FIRST_AID_GUIDES = [
  {
    id: '1',
    title: 'Bleeding Control',
    content: `1. Apply direct pressure to the wound using a clean cloth or bandage
2. If possible, elevate the injured area above the heart
3. If bleeding doesn't stop, apply pressure to the appropriate pressure point
4. Use a tourniquet only as a last resort for life-threatening limb bleeding
5. Once bleeding is controlled, secure the bandage with tape or more wrapping`,
    severity: 'high',
    tags: ['bleeding', 'wound', 'cut']
  },
  {
    id: '2',
    title: 'Fracture & Bone Injury',
    content: `1. Do not move the person unless absolutely necessary
2. Immobilize the injured area in the position found
3. Apply a cold pack wrapped in cloth to reduce swelling
4. For open fractures, cover the wound with a clean bandage
5. Create a splint using available materials (sticks, boards)
6. Pad the splint and secure it without affecting circulation`,
    severity: 'high',
    tags: ['fracture', 'bone', 'splint']
  },
  {
    id: '3',
    title: 'Burns Treatment',
    content: `1. Remove the person from the source of the burn
2. Cool the burn with cool (not cold) running water for 10-15 minutes
3. Do not apply ice directly to a burn
4. Do not break blisters
5. Cover the burn with a sterile, non-stick bandage
6. For severe burns, keep the victim warm and seek help immediately`,
    severity: 'critical',
    tags: ['burn', 'fire', 'heat']
  },
  {
    id: '4',
    title: 'Hypothermia',
    content: `1. Move the person to a warm, dry location
2. Remove wet clothing and replace with dry clothing
3. Wrap in warm blankets, focusing on the torso first
4. Apply warm (not hot) compresses to the neck, chest wall, and groin
5. If conscious, give warm, sweet beverages (no alcohol)
6. Handle the person gently and avoid rubbing their skin`,
    severity: 'critical',
    tags: ['cold', 'temperature', 'freezing']
  },
  {
    id: '5',
    title: 'Snake Bite',
    content: `1. Keep the victim calm and restrict movement
2. Position the affected area below heart level if possible
3. Clean the wound gently with soap and water if available
4. Cover with a clean, dry dressing
5. Mark the edge of swelling on the skin and note the time
6. DO NOT cut the wound or attempt to suck out venom
7. DO NOT apply a tourniquet or ice
8. Try to identify the snake from a safe distance`,
    severity: 'critical',
    tags: ['snake', 'bite', 'venom', 'poison']
  }
];

type GuideSeverity = 'low' | 'medium' | 'high' | 'critical';

interface GuideItem {
  id: string;
  title: string;
  content: string;
  severity: GuideSeverity;
  tags: string[];
}

const Guides: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [guides, setGuides] = useState<GuideItem[]>(FIRST_AID_GUIDES);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      setGuides(FIRST_AID_GUIDES);
      return;
    }
    
    const filtered = FIRST_AID_GUIDES.filter(guide => 
      guide.title.toLowerCase().includes(term) || 
      guide.content.toLowerCase().includes(term) ||
      guide.tags.some(tag => tag.includes(term))
    );
    
    setGuides(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      <div className="flex items-center mb-6">
        <BookOpen className="text-green-500 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-white">First Aid Guides</h2>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-500" size={18} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="bg-gray-700 border border-gray-600 w-full pl-10 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search guides..."
        />
      </div>
      
      {guides.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-300 mb-2">No guides found</p>
          <p className="text-gray-400 text-sm">
            Try searching for different keywords
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {guides.map(guide => (
            <TriageCard
              key={guide.id}
              title={guide.title}
              content={guide.content}
              severity={guide.severity}
            />
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          These guides are for emergency use only and do not substitute professional medical care.
        </p>
      </div>
    </div>
  );
};

export default Guides;