import styled from "styled-components";
import { createRef, useState } from "react";
import { Album } from "../../interface/Album";
import { samples } from "../../data/samples";
import { covers } from "../../data/covers";
import { FastAverageColor } from 'fast-average-color';


const FAC = new FastAverageColor();


interface Props {
    albums: Album[],
    divNo: number,
}


const Rankings = ({ albums, divNo }: Props) => {

    const audioRef = createRef<HTMLAudioElement>();
    const [song, setSong] = useState<string>(samples["Daydream Nation"][0]);

    function onClick() {
        const audioEl = document.getElementById("audio-player");

        if (audioEl instanceof HTMLAudioElement) {
            audioEl.volume = 0.1;
        }

        if (audioRef.current instanceof HTMLAudioElement) {
            audioRef.current.play();
        }
    }

    function onHover(title: string, divNo: number) {
        const htmlBlocks = document.getElementsByClassName("hover-bg");
        FAC.getColorAsync(covers[title])
            .then((color: any) => {
                const el = htmlBlocks.item(divNo);
                if (el instanceof HTMLDivElement) {
                    el.style.setProperty("--gradient", `linear-gradient(45deg, ${color.hex}, #042e3b)`)
                    console.log(el.style.getPropertyValue("--gradient"))
                    el.style.setProperty("opacity", "1")
                }
            })
    }

    function onMouseLeave(divNo: number) {
        const htmlBlocks = document.getElementsByClassName("hover-bg");
        const el = htmlBlocks.item(divNo);
        if (el instanceof HTMLDivElement) {
            el.style.setProperty("opacity", "0")
        }
    }


    return (
        <Container>
            {
                albums.map((album, rank) => (
                    <AlbumContainer onClick={onClick} onMouseEnter={() => { onHover(album.title, divNo) }}
                        onMouseLeave={() => onMouseLeave(divNo)}>
                        <div style={{ "padding": "0 1em 0 1em", "justifyContent": "center" }}>
                            {rank + 1}
                        </div>
                        <div>
                            <div>
                                {album.title}
                            </div>
                            <div>
                                {album.artist}
                            </div>
                        </div>
                        <AlbumCover src={album.title in covers ? covers[album.title] : ""} />
                    </AlbumContainer>
                ))
            }
            <audio ref={audioRef} id="audio-player">
                <source src={song} />
            </audio>

        </Container>
    );
};


const Container = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
`;

const AlbumContainer = styled.div`
    width: 40%;
    display: flex;
    background-color: #064a61;
    padding: .5em 0 .5em 0;
    position: relative;
    margin: 1em 0 1em 0;
    filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5));
    transition: .1s;
    align-items: center;
    cursor: pointer;

    :hover {
        z-index: 10;
        transform: scale(1.2) translateX(7.5%);
    }

    :hover > img {
        max-width: 5em;
        max-height: 5em;
        margin: -1em;
    }
`;


const AlbumCover = styled.img`
    transition: .3s;
    position: absolute;
    right: 0;
    top: 0;
    max-width: auto;
    max-height: 100%;
`


export default Rankings;