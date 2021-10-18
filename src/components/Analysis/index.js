import React from 'react'
import { BarChart, PieChart } from '../Charts';

export const AnalysisComponent = ({ dataForBarChart, dataForPieChart }) => {
    return (
        <div className="mh-5">
            <h5 className="centered-heading">Analysis Report</h5>
            <div className="chart-container">
                <BarChart data={dataForBarChart} title="Most Viewed Product" horizontalAxisTitle="Views" verticalAxisTitle="Products" />
                <PieChart data={dataForPieChart} title="Most Ordered Product" />
            </div>
        </div>
    )
}
