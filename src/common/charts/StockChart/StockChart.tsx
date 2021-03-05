import React, { FC, HTMLAttributes, useEffect, useRef } from 'react'
import * as d3 from 'd3'
// import styles from './StockChart.module.scss'
import { IHistoricalDataPairData } from 'apis/TopListsApi/TopListsApi.types'
const HEIGHT = 400
const WIDTH = 900
export interface StockChartProps extends HTMLAttributes<HTMLElement> {
  data: IHistoricalDataPairData.Datum[]
}

const StockChart: FC<StockChartProps> = ({
  data,
  ...rest
}) => {
  const y = d3
    .scaleLinear()
    .domain([
      d3.min(data, d => d.high) as number,
      d3.max(data, d => d.high) as number
    ])
    .range([HEIGHT, 0])

  const x = d3
    .scaleTime()
    .domain(
      d3.extent(data, d => d.time) as Iterable<number>
    )
    .range([0,WIDTH])

  const line = d3
    .line<IHistoricalDataPairData.Datum>()
      .x((d: IHistoricalDataPairData.Datum) => x(d.time))
      .y((d: IHistoricalDataPairData.Datum) => y(d.high))

  const d3Container = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = d3.select(d3Container.current)
      .append('g')
      .attr('transform', 'translate(24, 14)')
      .attr('stroke', 'transparent')
      .call(d3.axisLeft(y))
      .attr('color', '#DDDDDD')
    // svg.selectAll('line')
    //   .attr('x2', 750)
    //   .attr('stroke', '#fcc117')
    svg.append("g")
      .attr('transform', `translate(0,400)`)
      .call(d3.axisBottom(x))
    svg.append('path')
      .datum(data)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line)
  }, [])
  return(
    <div {...rest}>
      <svg height={HEIGHT + 30} width={WIDTH} ref={d3Container} />
    </div>
  )
}

export default StockChart
