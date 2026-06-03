import { motion } from 'motion/react';
import { Calendar, User, Award, Image as ImageIcon } from 'lucide-react';
import WarDiaryDetails from '../../imports/WarDiaryDitailes/WarDiaryDitailes';
import AWeatherDetails from '../../imports/AWeatherDetials/AWeatherDetials';
import KiteRunnerDetails from '../../imports/TheKiteRunnerDetiales/TheKiteRunnerDetiales';
import TheOneDetiales from '../../imports/TheOneDetiales/TheOneDetiales';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaType: 'image' | 'video' | 'component';
  mediaUrl: string;
}

interface ProjectDetailProps {
  project: Project;
  isDarkMode: boolean;
}

export function ProjectDetail({ project, isDarkMode }: ProjectDetailProps) {
  // War Diary — Figma node 158-1613 (see WarDiaryDitailes.tsx)
  if (project.id === 'proj1') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="box-border h-full min-h-0 w-[1400px] max-w-full min-w-0 overflow-hidden rounded-3xl shadow-2xl"
        style={{ 
          pointerEvents: 'auto',
          backgroundColor: '#ffffff',
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Render case study component directly - it handles its own layout */}
        <div className="h-full w-full min-w-0 overflow-x-hidden overflow-y-auto">
          <WarDiaryDetails />
        </div>
      </motion.div>
    );
  }

  // If this is the A WEATHER project, render the case study directly at detail size
  if (project.id === 'proj2') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="box-border h-full min-h-0 w-[1400px] max-w-full min-w-0 overflow-hidden rounded-3xl shadow-2xl"
        style={{ 
          pointerEvents: 'auto',
          backgroundColor: '#ffffff',
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Render case study component directly - it handles its own layout */}
        <div className="h-full w-full min-w-0 overflow-x-hidden overflow-y-auto">
          <AWeatherDetails />
        </div>
      </motion.div>
    );
  }

  if (project.id === 'proj3') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="box-border h-full min-h-0 w-[1400px] max-w-full min-w-0 overflow-hidden rounded-3xl shadow-2xl"
        style={{
          pointerEvents: 'auto',
          backgroundColor: '#ffffff',
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="h-full w-full min-w-0 overflow-x-hidden overflow-y-auto">
          <KiteRunnerDetails />
        </div>
      </motion.div>
    );
  }

  if (project.id === 'proj4') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="box-border h-full min-h-0 w-[1400px] max-w-full min-w-0 overflow-hidden rounded-3xl shadow-2xl"
        style={{
          pointerEvents: 'auto',
          backgroundColor: '#DAD7DE',
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="h-full w-full min-w-0 overflow-x-hidden overflow-y-auto">
          <TheOneDetiales />
        </div>
      </motion.div>
    );
  }

  // Default detail view for other projects
  const gradients = [
    'from-purple-500 to-pink-600',
    'from-blue-500 to-cyan-600',
    'from-orange-500 to-red-600',
    'from-green-500 to-emerald-600',
  ];

  const projectIndex = parseInt(project.id.replace('proj', '')) - 1;
  const gradient = gradients[projectIndex % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="box-border flex h-full min-h-0 w-[1400px] max-w-full min-w-0 flex-col overflow-hidden rounded-3xl shadow-2xl transition-colors duration-500"
      style={{ 
        pointerEvents: 'auto',
        backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Hero Image */}
        <div className={`h-[320px] bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
          <div className="text-white text-9xl font-bold opacity-20">
            {project.title.charAt(0)}
          </div>
          <div className="absolute bottom-6 left-8 right-8">
            <h2 className="text-white text-5xl font-bold drop-shadow-lg">
              {project.title}
            </h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-10">
          {/* Description */}
          <div className="mb-8">
            <h3 className={`text-sm uppercase tracking-wider mb-3 font-semibold ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Project Overview
            </h3>
            <p className={`text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {project.description}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div>
                <div className={`text-xs uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>Year</div>
                <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>2026</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <User className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div>
                <div className={`text-xs uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>Client</div>
                <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Confidential</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Award className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div>
                <div className={`text-xs uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>Role</div>
                <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Lead Designer</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <ImageIcon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div>
                <div className={`text-xs uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>Deliverables</div>
                <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>15+ Assets</div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className={`text-sm uppercase tracking-wider mb-4 font-semibold ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Skills Applied
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Design', 'Typography', 'Branding', 'Concept', 'Art Direction', 'Visual Identity'].map((skill) => (
                <span 
                  key={skill}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-8">
            <h3 className={`text-sm uppercase tracking-wider mb-4 font-semibold ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Design Process
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-900'
                }`}>
                  1
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Research & Discovery</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Understanding the brand, audience, and competitive landscape.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-900'
                }`}>
                  2
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Concept Development</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Exploring multiple creative directions and visual approaches.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-900'
                }`}>
                  3
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Refinement & Execution</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Iterating on the chosen direction and delivering final assets.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className={`rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-sm uppercase tracking-wider mb-3 font-semibold ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Results & Impact
            </h3>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The project successfully achieved its objectives, delivering a cohesive visual system that resonates with the target audience while pushing creative boundaries. The design has been well-received and continues to serve as a strong foundation for future brand initiatives.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}