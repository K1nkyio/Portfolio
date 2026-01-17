import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface SkillData {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'ai';
}

const skillsData: SkillData[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 85, category: 'backend' },
  { name: 'Next.js', level: 88, category: 'frontend' },
  { name: 'ML', level: 75, category: 'ai' },
  { name: 'PostgreSQL', level: 82, category: 'backend' },
  { name: 'Kotlin', level: 80, category: 'mobile' },
];

const categoryColors: Record<string, string> = {
  frontend: '#3b82f6',
  backend: '#a855f7',
  mobile: '#f97316',
  ai: '#22c55e',
};

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

function SkillPoint({ skill, angle, maxRadius }: { skill: SkillData; angle: number; maxRadius: number }) {
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
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1);
      // Gentle floating animation
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
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={categoryColors[skill.category]}
          emissive={categoryColors[skill.category]}
          emissiveIntensity={hovered ? 0.8 : 0.4}
        />
      </mesh>

      {/* Outer glow ring when hovered */}
      {hovered && (
        <mesh position={position}>
          <ringGeometry args={[0.25, 0.3, 32]} />
          <meshBasicMaterial
            color={categoryColors[skill.category]}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Connection line from center */}
      {hovered && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, ...position])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineDashedMaterial
            color={categoryColors[skill.category]}
            dashSize={0.1}
            gapSize={0.05}
          />
        </line>
      )}

      {/* Skill name label */}
      <Text
        position={labelPosition}
        fontSize={0.25}
        color={hovered ? '#ffffff' : '#888888'}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>

      {/* Level badge when hovered */}
      {hovered && (
        <Float speed={2} floatIntensity={0.3}>
          <group position={[position[0], position[1] + 0.5, position[2]]}>
            <mesh>
              <planeGeometry args={[0.6, 0.3]} />
              <meshBasicMaterial color={categoryColors[skill.category]} />
            </mesh>
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {skill.level}%
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

function SpiderWebScene({ skills }: { skills: SkillData[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const maxRadius = 2.5;
  const levels = 5;

  // Mouse-controlled rotation
  useFrame((state) => {
    if (groupRef.current) {
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;
      
      // Smooth rotation based on mouse position
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
    }
  });

  return (
    <group ref={groupRef}>
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
  return (
    <motion.div
      className="w-full h-[500px] md:h-[600px] relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Instruction hint */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        Move mouse to rotate • Hover skills for details
      </motion.div>

      <Canvas
        camera={{ position: [0, 3, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <SpiderWebScene skills={skillsData} />
      </Canvas>
    </motion.div>
  );
}
