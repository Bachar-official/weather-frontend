import type { ForecastDot } from "../../ForecastScreen";

interface ChartProps {
  data: ForecastDot[];
  lineColor: string;
  width?: number;
  height?: number;
  dayDotColor: string;
  nightDotColor: string;
  isDay: boolean;
}

function ForecastChart({
  data = [],
  lineColor = '#FFF',
  dayDotColor,
  nightDotColor,
  width = 500,
  height = 600,
  isDay,
}: ChartProps) {
  if (data.length === 0) return null;

  var padding = {
    top: 20,
    right: 20,
    bottom: 0,
    left: 20,
  };

  var temps = data.map(function (d) {
    return d.temperature;
  });

  var minTemp = Math.min.apply(null, temps) - 1;
  var maxTemp = Math.max.apply(null, temps) + 1;

  function scaleX(index: number) {
    return (
      padding.left +
      (width - padding.left - padding.right) *
      index /
      (data.length - 1)
    );
  }

  function scaleY(value: number) {
    return (
      height -
      padding.bottom -
      (value - minTemp) *
      (height - padding.top - padding.bottom) /
      (maxTemp - minTemp)
    );
  }

  function buildPath() {
    if (data.length < 2) return "";

    var d = "";

    data.forEach(function (p, i) {
      var x = scaleX(i);
      var y = scaleY(p.temperature);

      if (i === 0) {
        d += "M " + x + " " + y;
      } else {
        d += " L " + x + " " + y;
      }
    });

    return d;
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"  // или "none" для растяжения
      style={{ display: 'block' }}>
      <defs>
        <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>

      {data.map(function (p, i) {
        if (i < data.length - 1) {
          var x1 = scaleX(i);
          var x2 = scaleX(i + 1);
          var middleX = (x1 + x2) / 2;

          return (
            <line
              key={"vline-" + i}
              x1={middleX}
              y1={0}
              x2={middleX}
              y2={height}
              stroke={isDay ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        }
        return null;
      })}

      {/* Line */}
      <path
        d={buildPath()}
        fill="none"
        stroke={lineColor}
        strokeWidth="4"
      />

      {/* Dots */}
      {data.map(function (p, i) {
        var x = scaleX(i);
        var y = scaleY(p.temperature);

        return (
          <g key={i} transform={"translate(" + x + "," + y + ")"}>
            <circle r="20" fill={p.isDay ? dayDotColor : nightDotColor} />
            <image
              href={p.image}
              x="-20"
              y="-20"
              width="40"
              height="40"
            />
            <text
              y="-25"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#ffffff"
              filter="url(#textShadow)"
              fontFamily="Arial, Helvetica, sans-serif"
            >
              {p.temperature}
            </text>
          </g>
        );
      })}

      {/* X axis on bottom */}
      {data.map(function (p, i) {
        var x = scaleX(i);
        var y = height;

        return (
          <text
            key={"x-" + i}
            x={x + 10}
            y={y}
            fontSize="16"
            fill="#ffffff"
            textAnchor="end"
            filter="url(#textShadow)"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            {p.time}
          </text>
        );
      })}

      {/* X axis on top */}
      {data.map(function (p, i) {
        var x = scaleX(i);
        var y = 13;

        return (
          <text
            key={"x-" + i}
            x={x + 10}
            y={y}
            fontSize="16"
            fill="#ffffff"
            textAnchor="end"
            filter="url(#textShadow)"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            {p.time}
          </text>
        );
      })}
    </svg>
  );
}

export default ForecastChart;