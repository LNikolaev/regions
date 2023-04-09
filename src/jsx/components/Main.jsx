import Region from "../../views/Region";

export default function Main() {

    return (
        <main>
            <div className="o-grid-container">
                <div className="o-grid-row" data-o-grid-colspan="center 12">
                    <h2 className="o-typography-heading-level-2">Regions</h2>
                </div>
                <div className="o-grid-row" data-o-grid-colspan="center 12">
                    <Region/>
                </div>
            </div>
        </main>
    );
}
