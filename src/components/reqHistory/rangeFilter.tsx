type RangeFilterProps = {
    label: string
    min: number
    max: number
    minValue?: number
    maxValue?: number
    minName: string
    maxName: string
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export function RangeFilter({
    label,
    min,
    max,
    minValue,
    maxValue,
    minName,
    maxName,
    onChange
}: RangeFilterProps) {

    const currentMin = minValue ?? min
    const currentMax = maxValue ?? max

    const minPercentage =
        ((currentMin - min) / (max - min)) * 100

    const maxPercentage =
        ((currentMax - min) / (max - min)) * 100

    const sliderClassName = `
        pointer-events-none
        absolute
        left-0
        top-1/2
        -translate-y-1/2
        w-full
        h-2
        m-0
        p-0
        appearance-none
        bg-transparent

        [&::-webkit-slider-runnable-track]:bg-transparent
        [&::-webkit-slider-runnable-track]:h-2

        [&::-moz-range-track]:bg-transparent
        [&::-moz-range-track]:h-2

        [&::-webkit-slider-thumb]:pointer-events-auto
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-5
        [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:border
        [&::-webkit-slider-thumb]:border-black
        [&::-webkit-slider-thumb]:cursor-pointer

        [&::-moz-range-thumb]:pointer-events-auto
        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:w-5
        [&::-moz-range-thumb]:h-5
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:border
        [&::-moz-range-thumb]:border-black
        [&::-moz-range-thumb]:cursor-pointer
    `

    return (
        <div className="space-y-2 border p-3">

            <p>{label}</p>

            <div className="flex gap-2">
                <span>{currentMin}</span>
                <span>-</span>
                <span>{currentMax}</span>
            </div>

            <div className="relative w-full h-8">

                {/* Background track */}
                <div
                    className="
                        absolute
                        top-1/2
                        -translate-y-1/2
                        w-full
                        h-2
                        rounded-full
                        bg-gray-300
                    "
                />

                {/* Selected range */}
                <div
                    className="
                        absolute
                        top-1/2
                        -translate-y-1/2
                        h-2
                        rounded-full
                        bg-black
                    "
                    style={{
                        left: `${minPercentage}%`,
                        right: `${100 - maxPercentage}%`
                    }}
                />

                {/* Minimum slider */}
                <input
                    type="range"
                    name={minName}
                    id={minName}
                    min={min}
                    max={currentMax}
                    value={currentMin}
                    onChange={onChange}
                    className={sliderClassName}
                />

                {/* Maximum slider */}
                <input
                    type="range"
                    name={maxName}
                    id={maxName}
                    min={currentMin}
                    max={max}
                    value={currentMax}
                    onChange={onChange}
                    className={sliderClassName}
                />

            </div>

        </div>
    )
}

