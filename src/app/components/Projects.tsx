import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import AWeatherMedia from '../../imports/Frame282-7-198';
import Frame378 from '../../imports/Frame378/Frame378';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  mediaType: 'image' | 'video' | 'component';
  mediaUrl: string;
}

interface ProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project, index: number) => void;
  selectedProject: Project | null;
  isDragging: boolean;
}

/** Vertical stack with 60px gap between cards; parent should use flex flex-col gap-[60px]. */
export function Projects({ projects, onProjectClick, selectedProject, isDragging }: ProjectsProps) {
  return (
    <>
      {projects.map((project, index) => {
        const isSelected = selectedProject?.id === project.id;
        const titleLength = project.title.length;
        const dynamicTitleSize =
          titleLength > 20 ? '68px' : titleLength > 14 ? '74px' : '82px';

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            className="relative w-[700px] max-w-full min-w-0 shrink-0"
            style={{ pointerEvents: 'auto' }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={() => !isDragging && onProjectClick(project, index)}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative h-[450px] w-[700px] max-w-full rounded-2xl overflow-hidden shadow-2xl text-left transition-all duration-500
                ${isSelected ? 'ring-4 ring-white' : ''}
              `}
            >
              {/* Background Media - Image or Video */}
              <div className="absolute inset-0">
                {project.mediaType === 'video' ? (
                  <video
                    src={project.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : project.mediaType === 'component' ? (
                  <div className="w-full h-full">
                    {project.id === 'proj2' ? <AWeatherMedia /> : project.id === 'proj4' ? <Frame378 /> : null}
                  </div>
                ) : (
                  <ImageWithFallback
                    src={project.mediaUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Dark Overlay for text readability */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
                  opacity: isSelected ? 0.7 : 0.5,
                }}
              />

              {/* Content Overlay - Centered Title */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-12">
                <h2
                  className="font-['Clash_Grotesk:Bold',sans-serif] leading-[1.1] text-white text-center"
                  style={{
                    fontSize: dynamicTitleSize,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.title}
                </h2>
              </div>

              <motion.div
                animate={{
                  x: isSelected ? 10 : 0,
                  rotate: isSelected ? 0 : 0,
                }}
                className="absolute bottom-8 right-8 text-white"
                style={{
                  fontSize: '48px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
        );
      })}
    </>
  );
}
