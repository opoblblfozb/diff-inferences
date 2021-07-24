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
} from "recharts";
import { NormalDistribution } from "normal-distribution";
import {
  generateLineData,
  extractFromStandardNormalDistribution,
} from "../utils/statistics";
import { Line } from "../components/models";

function ControllerTrueLine({ trueLine, setTrueLine, data, setData }) {
  const [parameterDisabled, setParameterDisabled] = useState(false);
  const onChangeHandle = (e) => {
    const id = e.currentTarget.id;
    const val = e.currentTarget.value;
    if (id == "slope-field") {
      const changedLine = new Line(trueLine.w1, Number(val));
      setTrueLine(changedLine);
    } else if (id == "intercept-field") {
      const changedLine = new Line(Number(val), trueLine.w2);
      setTrueLine(changedLine);
    }
  };
  const onClickHandle = (e) => {
    console.log("data", data);
    const generatedData = generateLineData(trueLine);
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

/*

const data = [
  { index: 10000, red: 1643, blue: 790 },
  { index: 1666, red: 182, blue: 42 },
  { index: 625, red: 56, blue: 11 },
  // Calculation of line of best fit is not included in this demo
  { index: 300, redLine: 0 },
  { index: 10000, redLine: 1522 },
  { index: 600, blueLine: 0 },
  { index: 10000, blueLine: 678 },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/composed-chart-with-best-fit-q7r21';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
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

          <XAxis dataKey="index" type="number" label={{ value: 'Index', position: 'insideBottomRight', offset: 0 }} />
          <YAxis unit="ms" type="number" label={{ value: 'Time', angle: -90, position: 'insideLeft' }} />
          <Scatter name="red" dataKey="red" fill="red" />
          <Scatter name="blue" dataKey="blue" fill="blue" />
          <Line dataKey="blueLine" stroke="blue" dot={false} activeDot={false} legendType="none" />
          <Line dataKey="redLine" stroke="red" dot={false} activeDot={false} legendType="none" />
        </ComposedChart>
      </ResponsiveContainer>
*/
function ViewTrueLine({ trueLine, data }) {
  const trueLineData = trueLine.generateDataForView();
  console.log(trueLineData);
  const concatedData = trueLineData.concat(data)
  console.log(concatedData)
  return (
      <ComposedChart
        width={200}
        height={200}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        data={concatedData}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="x" />
        <YAxis type="number" name="y" />
        <Scatter name="data" datakey="y" fill="#8884d8" />
        <Line name="trueline" datakey="line_y" fill="#8884d8" />
      </ComposedChart>
  );
}

export default function Home() {
  const [trueLine, setTrueLine] = useState(new Line(1, 2));
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
      </CssBaseline>
    </NoSsr>
  );
}
