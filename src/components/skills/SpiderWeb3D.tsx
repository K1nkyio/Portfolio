import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SkillData {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'ai';
  description: string;
  subSkills: { name: string; level: number }[];
  yearsExp: number;
  projects: number;
}

const skillsData: SkillData[] = [
  { 
    name: 'React', 
    level: 95, 
    category: 'frontend',
    description: 'Building dynamic, component-based user interfaces with React ecosystem',
    subSkills: [
      { name: 'Hooks & Context', level: 98 },
      { name: 'Redux/Zustand', level: 90 },
      { name: 'React Query', level: 92 },
      { name: 'Testing Library', level: 85 },
    ],
    yearsExp: 5,
    projects: 45
  },
  { 
    name: 'TypeScript', 
    level: 90, 
    category: 'frontend',
    description: 'Type-safe JavaScript development with advanced type patterns',
    subSkills: [
      { name: 'Generics', level: 88 },
      { name: 'Type Guards', level: 92 },
      { name: 'Utility Types', level: 90 },
      { name: 'Declaration Files', level: 85 },
    ],
    yearsExp: 4,
    projects: 38
  },
  { 
    name: 'Node.js', 
    level: 85, 
    category: 'backend',
    description: 'Server-side JavaScript for scalable backend applications',
    subSkills: [
      { name: 'Express/Fastify', level: 90 },
      { name: 'Authentication', level: 88 },
      { name: 'REST APIs', level: 92 },
      { name: 'WebSockets', level: 80 },
    ],
    yearsExp: 4,
    projects: 30
  },
  { 
    name: 'Python', 
    level: 85, 
    category: 'backend',
    description: 'Versatile programming for data science, APIs, and automation',
    subSkills: [
      { name: 'FastAPI/Django', level: 85 },
      { name: 'Data Analysis', level: 88 },
      { name: 'Scripting', level: 92 },
      { name: 'Testing', level: 82 },
    ],
    yearsExp: 5,
    projects: 28
  },
  { 
    name: 'Next.js', 
    level: 88, 
    category: 'frontend',
    description: 'Full-stack React framework with SSR, SSG, and API routes',
    subSkills: [
      { name: 'App Router', level: 90 },
      { name: 'Server Components', level: 85 },
      { name: 'API Routes', level: 92 },
      { name: 'Middleware', level: 88 },
    ],
    yearsExp: 3,
    projects: 22
  },
  { 
    name: 'ML', 
    level: 75, 
    category: 'ai',
    description: 'Machine learning models and AI integration for intelligent apps',
    subSkills: [
      { name: 'TensorFlow', level: 72 },
      { name: 'PyTorch', level: 70 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'NLP', level: 75 },
    ],
    yearsExp: 2,
    projects: 12
  },
  { 
    name: 'PostgreSQL', 
    level: 82, 
    category: 'backend',
    description: 'Advanced relational database design and optimization',
    subSkills: [
      { name: 'Query Optimization', level: 85 },
      { name: 'Indexing', level: 80 },
      { name: 'Stored Procedures', level: 78 },
      { name: 'Replication', level: 75 },
    ],
    yearsExp: 4,
    projects: 25
  },
  { 
    name: 'Kotlin', 
    level: 80, 
    category: 'mobile',
    description: 'Modern Android development with Kotlin and Jetpack',
    subSkills: [
      { name: 'Jetpack Compose', level: 82 },
      { name: 'Coroutines', level: 85 },
      { name: 'Room DB', level: 78 },
      { name: 'MVVM', level: 80 },
    ],
    yearsExp: 3,
    projects: 15
  },
];

const categoryColors: Record<string, string> = {
  frontend: '#3b82f6',
  backend: '#a855f7',
  mobile: '#f97316',
  ai: '#22c55e',
};

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  mobile: 'Mobile Development',
  ai: 'AI & Machine Learning',
};

interface SkillDetailPanelProps {
  skill: SkillData | null;
  onClose: () => void;
}

function SkillDetailPanel({ skill, onClose }: SkillDetailPanelProps) {
  if (!skill) return null;

  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-md bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Gradient header */}
        <div 
          className="h-2"
          style={{ background: `linear-gradient(90deg, ${categoryColors[skill.category]}, ${categoryColors[skill.category]}80)` }}
        />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${categoryColors[skill.category]}, ${categoryColors[skill.category]}80)` }}
            >
              {skill.level}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">{categoryLabels[skill.category]}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {skill.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold" style={{ color: categoryColors[skill.category] }}>
                {skill.yearsExp}+
              </div>
              <div className="text-xs text-muted-foreground">Years Experience</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold" style={{ color: categoryColors[skill.category] }}>
                {skill.projects}+
              </div>
              <div className="text-xs text-muted-foreground">Projects Completed</div>
            </div>
          </div>

          {/* Sub-skills */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Specialized Skills</h4>
            {skill.subSkills.map((subSkill, index) => (
              <motion.div
                key={subSkill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">{subSkill.name}</span>
                  <span className="text-xs font-medium" style={{ color: categoryColors[skill.category] }}>
                    {subSkill.level}%
                  </span>
                </div>
                <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${categoryColors[skill.category]}, ${categoryColors[skill.category]}60)` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${subSkill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WebRing({ radius, segments, yOffset = 0 }: { radius: number; segments: number; yOffset?: number }) {
  const lineRef = useRef<THREE.Line>(null);
  
  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      ));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, segments, yOffset]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color: '#888888', opacity: 0.3, transparent: true });
  }, []);

  return <primitive ref={lineRef} object={new THREE.Line(geometry, material)} />;
}

function Spoke({ angle, maxRadius }: { angle: number; maxRadius: number }) {
  const lineRef = useRef<THREE.Line>(null);
  
  const geometry = useMemo(() => {
    const pts = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(
        Math.cos(angle) * maxRadius,
        0,
        Math.sin(angle) * maxRadius
      )
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [angle, maxRadius]);

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color: '#888888', opacity: 0.3, transparent: true });
  }, []);

  return <primitive ref={lineRef} object={new THREE.Line(geometry, material)} />;
}

interface SkillPointProps {
  skill: SkillData;
  angle: number;
  maxRadius: number;
  isSelected: boolean;
  onSelect: () => void;
}

function SkillPoint({ skill, angle, maxRadius, isSelected, onSelect }: SkillPointProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const radius = (skill.level / 100) * maxRadius;
  
  const position: [number, number, number] = [
    Math.cos(angle) * radius,
    0,
    Math.sin(angle) * radius
  ];

  const labelPosition: [number, number, number] = [
    Math.cos(angle) * (maxRadius + 0.5),
    0,
    Math.sin(angle) * (maxRadius + 0.5)
  ];

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = isSelected ? 2 : hovered ? 1.5 : 1;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      );
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + angle) * 0.05;
    }
  });

  return (
    <group>
      {/* Skill point sphere */}
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={categoryColors[skill.category]}
          emissive={categoryColors[skill.category]}
          emissiveIntensity={isSelected ? 1 : hovered ? 0.8 : 0.4}
        />
      </mesh>

      {/* Pulsing ring when selected */}
      {isSelected && (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.5, 32]} />
          <meshBasicMaterial
            color={categoryColors[skill.category]}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Outer glow ring when hovered */}
      {(hovered || isSelected) && (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.25, 0.3, 32]} />
          <meshBasicMaterial
            color={categoryColors[skill.category]}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Skill name label */}
      <Text
        position={labelPosition}
        fontSize={0.25}
        color={isSelected ? '#ffffff' : hovered ? '#ffffff' : '#888888'}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>

      {/* Level badge when hovered (not when selected) */}
      {hovered && !isSelected && (
        <Float speed={2} floatIntensity={0.3}>
          <group position={[position[0], position[1] + 0.5, position[2]]}>
            <mesh>
              <planeGeometry args={[0.8, 0.35]} />
              <meshBasicMaterial color={categoryColors[skill.category]} />
            </mesh>
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.12}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              Click for details
            </Text>
          </group>
        </Float>
      )}
    </group>
  );
}

function SkillArea({ skills, maxRadius }: { skills: SkillData[]; maxRadius: number }) {
  const shape = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    skills.forEach((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      pts.push(new THREE.Vector2(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      ));
    });
    const shape = new THREE.Shape(pts);
    return shape;
  }, [skills, maxRadius]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial
        color="#6366f1"
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface SpiderWebSceneProps {
  skills: SkillData[];
  selectedSkill: SkillData | null;
  onSelectSkill: (skill: SkillData | null) => void;
}

function SpiderWebScene({ skills, selectedSkill, onSelectSkill }: SpiderWebSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const maxRadius = 2.5;
  const levels = 5;

  // Zoom camera when skill is selected
  useFrame((state) => {
    if (groupRef.current) {
      const targetZ = selectedSkill ? 4.5 : 6;
      const targetY = selectedSkill ? 2 : 3;
      
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
      
      if (!selectedSkill) {
        const mouseX = state.mouse.x;
        const mouseY = state.mouse.y;
        
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mouseX * 0.5,
          0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseY * 0.3,
          0.05
        );
      } else {
        // Slowly rotate when skill is selected
        groupRef.current.rotation.y += 0.002;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          0.2,
          0.05
        );
      }
    }
  });

  return (
    <group ref={groupRef} onClick={() => onSelectSkill(null)}>
      {/* Ambient and point lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#a855f7" />

      {/* Center point */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Inner center ring */}
      <mesh>
        <torusGeometry args={[0.2, 0.02, 8, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
      </mesh>

      {/* Web rings */}
      {Array.from({ length: levels }).map((_, i) => (
        <WebRing
          key={`ring-${i}`}
          radius={((i + 1) / levels) * maxRadius}
          segments={skills.length}
        />
      ))}

      {/* Spokes */}
      {skills.map((_, i) => {
        const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <Spoke
            key={`spoke-${i}`}
            angle={angle}
            maxRadius={maxRadius}
          />
        );
      })}

      {/* Skill area fill */}
      <SkillArea skills={skills} maxRadius={maxRadius} />

      {/* Skill points */}
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <SkillPoint
            key={skill.name}
            skill={skill}
            angle={angle}
            maxRadius={maxRadius}
            isSelected={selectedSkill?.name === skill.name}
            onSelect={() => onSelectSkill(skill)}
          />
        );
      })}

      {/* Decorative particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Float key={`particle-${i}`} speed={1 + Math.random()} floatIntensity={0.5}>
          <mesh
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 6
            ]}
          >
            <sphereGeometry args={[0.02 + Math.random() * 0.03, 8, 8]} />
            <meshBasicMaterial
              color={Object.values(categoryColors)[i % 4]}
              transparent
              opacity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function SpiderWeb3D() {
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);

  const handleSelectSkill = useCallback((skill: SkillData | null) => {
    setSelectedSkill(skill);
  }, []);

  return (
    <motion.div
      className="w-full h-[500px] md:h-[600px] relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Instruction hint */}
      <AnimatePresence>
        {!selectedSkill && (
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Move mouse to rotate • Click skills for details
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill detail panel */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillDetailPanel 
            skill={selectedSkill} 
            onClose={() => setSelectedSkill(null)} 
          />
        )}
      </AnimatePresence>

      <Canvas
        camera={{ position: [0, 3, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <SpiderWebScene 
          skills={skillsData} 
          selectedSkill={selectedSkill}
          onSelectSkill={handleSelectSkill}
        />
      </Canvas>
    </motion.div>
  );
}
