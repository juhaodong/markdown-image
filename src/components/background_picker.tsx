import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface BackgroundPickerProps {
  onBackgroundSelect: (style: string) => void
}

// Simplified background options with only raw values
const backgroundOptions = [
  { label: '纯白', value: '#ffffff' },
  {
    label: '淡雅黄色',
    value: '#e4e4ba',
  },
  { label: '渐变彩虹', value: 'linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1)' },
  { label: '冷色渐变', value: 'linear-gradient(120deg, #89f7fe, #66a6ff)' },
  { label: '暖色渐变', value: 'linear-gradient(90deg, #ff9a9e, #fecfef)' },
  { label: '绿色过渡', value: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
]

export default function BackgroundPicker({ onBackgroundSelect }: BackgroundPickerProps) {
  const [selectedValue, setSelectedValue] = useState(backgroundOptions[0].value)

  function handleBackgroundChange(value: string) {
    setSelectedValue(value)
    onBackgroundSelect(value) // Pass the raw value (e.g., #000000, linear-gradient(...)) to parent
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">选择背景模式:</h3>
      <div className="grid grid-cols-6 gap-4">
        {backgroundOptions.map((option, index) => (
          <Card
            key={index}
            onClick={() => handleBackgroundChange(option.value)}
            className={`cursor-pointer border ${
              selectedValue === option.value ? 'border-green-600 shadow-sm' : ''
            } rounded border-2 border-black`}
            style={{
              height: '80px',
              background: option.value, // Directly apply the value as the background
              backgroundSize: 'cover', // Ensure gradients display correctly
            }}
          >
            <div
              className={`flex items-center justify-center h-full text-center font-semibold text-sm ${
                selectedValue === option.value ? 'text-blue-700' : 'text-gray-800'
              }`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)', // Label overlay for visibility
              }}
            >
              {option.label}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
