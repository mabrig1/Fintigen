import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";
import {
  courseMeta,
  courseModules,
} from "@/lib/courses/quantum-computing-basics";

export const metadata: Metadata = {
  title: "Quantum Computing Basics — Interactive Course",
  description:
    "Qubits, superposition, entanglement, and quantum gates through to Deutsch-Jozsa, Grover's search, Shor's algorithm, and the Variational Quantum Eigensolver. An 8-module interactive course built on IBM's Qiskit framework, culminating in a real-hardware deployment capstone.",
};

export default function QuantumComputingBasicsCoursePage() {
  return (
    <CoursePlayer
      meta={courseMeta}
      modules={courseModules}
      storageKey="fintigen-course-quantum-computing-basics"
      certificateId="FTG-QUANTUM-001"
    />
  );
}
