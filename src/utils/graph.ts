import { Language } from "../api"

export const createGraphDataByLanguages = (languages: Language[] | undefined) => {
  if (!languages) return
  const graphData = {
    labels: languages.map(language => language.name),
    datasets: [
      {
        data: languages.map(language => language.level),
        backgroundColor: languages.map(language => language.color + '20'),
        borderColor: languages.map(language => language.color),
        borderWidth: 1,
      },
    ],
    height: 10 * languages.length + 6
  }
  return graphData
}

export const getGraphOptions = (): any => {
  return {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        display: false,
        ticks: {
          min: 0,
          max: 20,
        },
      }],
      yAxes: [{
        afterFit: function(scaleInstance: any) {
          scaleInstance.width = 100
        }
      }],
    },
    tooltips: {
      enabled: false
    },
    plugins: {
      datalabels: {
        color: '#24292E',
        anchor: 'start',
        align: 'end'
      }
    },
  }
}