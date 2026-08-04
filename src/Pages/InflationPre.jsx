import React from "react";
import CenteredBlock from "../CenteredBlock";
import FillBox from "../FillBox";
import SubmitButton from "../SubmitButton";


export const InflationPre = () => {
    return (
        <div>
          <CenteredBlock>
                <h2>ทำนายเงินเฟ้อ (Version 0.1)</h2>
                <FillBox placeholder={"จำนวนเงิน"}/>
                <FillBox placeholder={"จำนวนปี"}/>
                <SubmitButton text="คำนวน"/> 
          </CenteredBlock>
        </div>
    );
}
