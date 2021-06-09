import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";

export const Loading = ({loading}) => {
    let [color, setColor] = useState("#ffffff");
    const override = css`
        display: block;
    `;
    return (
        <div className='loader'>
            <DotLoader color={color} loading={loading} css={override} size={200} />
        </div>
    )
}
