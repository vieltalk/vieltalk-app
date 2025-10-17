import { Circle, Svg } from 'react-native-svg'
import { Box } from './ui/box'

interface Props {
  size?: number
  strokeWidth?: number
  value?: number
  backgroundColor?: string
  progressColor?: string
}

export function CircularProgress({
  size = 16,
  strokeWidth = 2,
  value = 50,
  backgroundColor = '#f2f2f2',
  progressColor = '#3b5998',
}: Props) {
  const radius = (size - strokeWidth) / 2
  const circum = radius * 2 * Math.PI
  const svgProgress = 100 - Math.min(Math.max(value, 0), 100)

  return (
    <Box className="p-3">
      <Svg width={size} height={size}>
        <Circle stroke={backgroundColor} fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <Circle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </Box>
  )
}
