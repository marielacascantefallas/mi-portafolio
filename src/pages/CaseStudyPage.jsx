import { Navigate, useParams } from 'react-router-dom'
import SimpleCaseStudy from '../components/CaseStudy/SimpleCaseStudy'
import projects from '../data/projects'

// Generic route for every project that uses the lightweight case-study
// template (anything other than Social Club, which keeps its own rich
// page/route). Looks the project up by slug so adding a new one only
// means adding an entry to src/data/projects.js.
export default function CaseStudyPage({ theme, onToggle }) {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/" replace />

  return <SimpleCaseStudy theme={theme} onToggle={onToggle} project={project} />
}
