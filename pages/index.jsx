import React from "react"
import { NoSsr } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import RowComponent from "../components/rowcomponent";



export default function Home() {
  const styles = useStyles();
  return (
    <NoSsr>
      <CssBaseline>
      <RowComponent leftComponent={<p>真の関数描画</p>} rightComponent={<p>真の関数設定</p>}></RowComponent>
      <RowComponent leftComponent={<p>最尤法データ空間</p>} rightComponent={<p>最尤法パラメタ空間</p>}></RowComponent>
      <RowComponent leftComponent={<p>最大事後確率推定データ空間</p>} rightComponent={<p>最大事後確率推定パラメタ空間</p>}></RowComponent>
      <RowComponent leftComponent={<p>ベイズ予測分布</p>} rightComponent={<p>ベイズ推定事後分布</p>}></RowComponent>
      </CssBaseline>
    </NoSsr>
  )
}
