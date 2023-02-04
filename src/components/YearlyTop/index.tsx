import React from "react";
import { Fragment } from "react";
import { AlbumRankings } from "../../data/AlbumRankings";
import { BEGIN_YEAR, END_YEAR } from "../../data/constants";
import Rankings from "./Rankings";
import Year from "./Year";


interface Props {
    components: React.MutableRefObject<(HTMLDivElement | null)[]>,
    setActiveYear: React.Dispatch<React.SetStateAction<number | null>>,
    preventYearChange: boolean
}


const YearlyTop = ({ components, setActiveYear, preventYearChange }: Props) => {


    const years: number[] = [];
    for (var i = BEGIN_YEAR; i <= END_YEAR; i++) {
        years.push(i);
    }

    function onMouseOver(idx: number) {
        console.log(preventYearChange)
        if (!preventYearChange) { setActiveYear(BEGIN_YEAR + idx); }
    }



    return (
        <Fragment>
            <div>
                {years.map((year, idx) => (
                    <div
                        key={idx}
                        className="block"
                        ref={(element) => { components.current[idx] = element }}
                        onMouseEnter={() => { onMouseOver(idx); }}>
                        <Year year={year}></Year>

                        <div className="hover-bg" key={idx} />
                        
                        {idx === 0 && <Rankings
                            albums={AlbumRankings[idx].rankings}
                            divNo={idx} />}


                    </div>
                ))}
            </div>

        </Fragment>
    );
};


export default YearlyTop;