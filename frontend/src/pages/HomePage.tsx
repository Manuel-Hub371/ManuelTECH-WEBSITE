import Hero from '../components/home/Hero'
import ServicesGrid from '../components/home/ServicesGrid'
import WhyUs from '../components/home/WhyUs'
import Process from '../components/home/Process'
import TrainingBand from '../components/home/TrainingBand'
import Industries from '../components/home/Industries'
import CaseStudies from '../components/home/CaseStudies'
import Testimonials from '../components/home/Testimonials'
import CTABand from '../components/home/CTABand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Process />
      <TrainingBand />
      <Industries />
      <CaseStudies />
      <Testimonials />
      <CTABand />
    </>
  )
}
