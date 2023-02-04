import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { BEGIN_YEAR, END_YEAR } from "../../data/constants";
import styled from "styled-components";
import { Slider } from "@mui/material";


interface Props {
    components: React.MutableRefObject<(HTMLDivElement | null)[]>,
    show: boolean,
    activeYear: number | null,
    setActiveYear: React.Dispatch<React.SetStateAction<number | null>>,
    setPreventYearChange: React.Dispatch<React.SetStateAction<boolean>>,
}

const nDecades = Math.floor((END_YEAR - BEGIN_YEAR) / 10);
const decades: number[] = []

for (var i = 0; i <= nDecades; ++i) {
    decades.push(i);
}


const YearNavigation = ({ components, show, activeYear, setActiveYear, setPreventYearChange }: Props) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setActiveYear(-newValue);
            setPreventYearChange(true);
        }
    };

    const handleCommittedChange = () => {
        setTimeout(() => {
            setPreventYearChange(false);
        }, 500);
    }

    const onDecadeClick = (decade: number) => {
        setPreventYearChange(true);
        const newYear = BEGIN_YEAR + decade * 10;
        setActiveYear(newYear);
        setTimeout(() => {
            setPreventYearChange(false);
        }, 500);
    }

    useEffect(() => {
        if (activeYear !== null) {
            const element = components.current[activeYear - BEGIN_YEAR];
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [activeYear, components]);

    return (
        <Container>
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <SliderBox>
                            <Slider
                                sx={{
                                    '& input[type="range"]': {
                                        WebkitAppearance: 'slider-vertical',
                                    },
                                }}
                                onChange={handleChange}
                                onChangeCommitted={handleCommittedChange}
                                orientation="vertical"
                                track={"inverted"}
                                value={activeYear === null ? -BEGIN_YEAR : -activeYear}
                                min={-END_YEAR}
                                max={-BEGIN_YEAR}
                                step={1}
                            />
                        </SliderBox>
                        <DecadesList>
                            {decades.map((decade) => (
                                <YearLabel key={decade}
                                    style={{ "top": `${(decade * 10) / (END_YEAR - BEGIN_YEAR) * 100}%` }}
                                    onClick={() => { onDecadeClick(decade) }}>
                                    {BEGIN_YEAR + decade * 10}
                                </YearLabel>
                            ))}
                        </DecadesList>
                    </motion.div>
                )}


            </AnimatePresence>
        </Container >
    );

};


const Container = styled.div`
    position: fixed;    
`


const SliderBox = styled.div`
    position: fixed;
    top: 2em;
    right: .5em;
    margin: 0;
    padding: 0;
    z-index: 10;
    height: 40vh;
`

const DecadesList = styled.div`
    position: fixed;
    top: 2em;
    right: 3em;
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 10;
    height: 40vh;
`

const YearLabel = styled.div`
    position: absolute;
    color: white;
    right: .1em;
    transition: .3s;
    transform: translateY(-50%);
    cursor: pointer;

    :hover {
        transform: scale(1.8) translateY(-50%) translateX(-25%);
    }
`


export default YearNavigation;