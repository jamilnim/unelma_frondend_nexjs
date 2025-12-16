import AboutDetail from "../../../component/about/AboutDetail";
import PageTransition from "../../../component/animation/PageTransition";
import FadeInSection from "../../../component/animation/FadeInSection";

export default function about() {
  return (
    <PageTransition>
      <FadeInSection>
        <AboutDetail />
      </FadeInSection>
    </PageTransition>
  );
}
