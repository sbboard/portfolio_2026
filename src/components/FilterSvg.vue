<template>
    <svg style="display: none">
        <defs>
            <filter
                id="dither"
                color-interpolation-filters="sRGB"
                x="0"
                y="0"
                width="100%"
                height="100%"
            >
                <feImage
                    width="4"
                    height="4"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAASElEQVR42gXBgQAAIAxFwW8QwhBCCCGEIYQQQgghhBBCCEMYwutOkphzYmbsvdG9l9YaEYG7o1or5xxKKay1UGYyxuC9R++dD7yGJkTj6F0HAAAAAElFTkSuQmCC"
                ></feImage>
                <feTile></feTile>
                <feComposite
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3="1"
                    k4="-0.5"
                    in="SourceGraphic"
                ></feComposite>
                <feComponentTransfer>
                    <feFuncR type="discrete" tableValues="0 1"></feFuncR>
                    <feFuncG type="discrete" tableValues="0 1"></feFuncG>
                    <feFuncB type="discrete" tableValues="0 1"></feFuncB>
                </feComponentTransfer>
            </filter>
        </defs>
    </svg>
</template>
