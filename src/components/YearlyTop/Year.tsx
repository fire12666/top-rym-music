import styled from "styled-components";
import { FULL_PAPER_POLYGON_PATH } from "../../data/constants";

interface Props {
    year: number
}


const Year = ({ year }: Props) => {
    return (
        <Container>
            <h2>{year}</h2>
        </Container>
    );
};


const Container = styled.div`
    width: 25%;
    height: fit-content;
    position: sticky;
    top: 2em;
    left: 1em;
    text-align: center;
    z-index: 5;
    background-color: #031d26;
    padding: 1em;
    filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5));
    clip-path: ${FULL_PAPER_POLYGON_PATH}
`


export default Year;