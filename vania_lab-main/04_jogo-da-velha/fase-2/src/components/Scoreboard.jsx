import react from "react";

export default function Scoreboard({scores})
{
    return(
        <div className="scoreboard">
            <span>Vitórias X: {scores.x}</span>
            <span>Vitórias O: {scores.o}</span>
            <span>Empates: {scores.draw}</span>
        </div>
    )
}