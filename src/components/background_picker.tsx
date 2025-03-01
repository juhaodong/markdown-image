import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface BackgroundPickerProps {
  onBackgroundSelect: (style: string) => void
}

// Simplified background options with only raw values
const backgroundOptions = [
  { label: '纯白', value: '#ffffff' }, // 简约干净的纯白
  { label: '米白', value: '#f8f4d9' }, // 柔和的米黄色
  { label: '樱花粉', value: '#fde6e6' }, // 浪漫的樱花色
  { label: '天空蓝', value: '#d8eeff' }, // 清新的天空蓝
  { label: '薄荷绿', value: '#e5f8e0' }, // 自然的薄荷绿色
  { label: '薰衣紫', value: '#f2e7fc' }, // 优雅的薰衣草紫色
];


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
