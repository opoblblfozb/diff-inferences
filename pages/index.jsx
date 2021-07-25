import React, { PureComponent } from "react";
import { NoSsr, TextField, Button } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import RowComponent from "../components/rowcomponent";
import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Legend,
} from "recharts";
import { NormalDistribution } from "normal-distribution";
import { regressionLine } from "../components/models";

function ControllerTrueLine({ trueLine, setTrueLine, data, setData }) {
  const [parameterDisabled, setParameterDisabled] = useState(false);
  const onChangeHandle = (e) => {
    const id = e.currentTarget.id;
    const val = e.currentTarget.value;
    if (id == "slope-field") {
      const changedLine = new regressionLine(trueLine.w1, Number(val));
      setTrueLine(changedLine);
    } else if (id == "intercept-field") {
      const changedLine = new regressionLine(Number(val), trueLine.w2);
      setTrueLine(changedLine);
    }
  };
  const onClickHandle = (e) => {
    const generatedData = trueLine.generateLineData();
    const tmp = [generatedData].concat(data);
    setData(tmp);
    setParameterDisabled(true);
  };
  return (
    <div>
      <TextField
        id="slope-field"
        label="w2:傾き"
        onChange={onChangeHandle}
        disabled={parameterDisabled}
      ></TextField>
      <TextField
        id="intercept-field"
        label="w1:切片"
        onChange={onChangeHandle}
        disabled={parameterDisabled}
      ></TextField>
      <Button color="primary" onClick={onClickHandle}>
        データ生成
      </Button>
    </div>
  );
}

function ViewTrueLine({ trueLine, data }) {
  const trueLineData = trueLine.segment;
  const concatedData = trueLineData.concat(data);
  //console.log(trueLine.generateYAxisTicksForView());
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <ComposedChart
        data={concatedData}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />

        <XAxis
          dataKey="x"
          type="number"
          label={{ value: "x", position: "insideBottomRight", offset: 0 }}
          //ticks={trueLine.generateXAxisTicksForView()}
        />
        <YAxis
          type="number"
          label={{ value: "y", angle: -90, position: "insideLeft" }}
          //ticks={trueLine.generateYAxisTicksForView()}
        />
        <Scatter name="データサンプル" dataKey="y" fill="coral" isAnimationActive={false}/>
        <Line
          name="真の回帰直線"
          dataKey="lineY"
          stroke="blue"
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default function Home() {
  const [trueLine, setTrueLine] = useState(new regressionLine(1, 2));
  const [mlLine, setMlLine] = useState();
  const [mapLine, setmapLine] = useState();
  const [bayesLine, setBayesLine] = useState();
  const [data, setData] = useState([]);

  return (
    <NoSsr>
      <CssBaseline>
        <RowComponent
          leftComponent={<ViewTrueLine trueLine={trueLine} data={data} />}
          rightComponent={
            <ControllerTrueLine
              trueLine={trueLine}
              setTrueLine={setTrueLine}
              data={data}
              setData={setData}
            />
          }
        ></RowComponent>
      </CssBaseline>
    </NoSsr>
  );
}

/*
        <RowComponent
          leftComponent={<p>最尤法データ空間</p>}
          rightComponent={<p>最尤法パラメタ空間</p>}
        ></RowComponent>
        <RowComponent
          leftComponent={<p>最大事後確率推定データ空間</p>}
          rightComponent={<p>最大事後確率推定パラメタ空間</p>}
        ></RowComponent>
        <RowComponent
          leftComponent={<p>ベイズ予測分布</p>}
          rightComponent={<p>ベイズ推定事後分布</p>}
        ></RowComponent>
*/
