import Header from '../components/header'
import Footer from '../components/footer'

const Dungeons: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePageD />} />
                    <Route path="heroes" element={<HeroesPage />} />
                    <Route path="artifacts" element={<ArtifactsPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                </Route>
            </Routes>
        </HasRouter>

    )

}
export default Dungeons