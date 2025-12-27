<script lang="ts" setup></script>

<template>
    <footer>
        I don't actually have anything to say in this footer. The only real reason this footer
        exists is because I thought a footer with some small text at the bottom of the page would
        look cool.<span>
            There's no information here, no hidden message, no fine print, and no legal
            disclaimer.</span
        >
        I guess not everything that exists needs to carry responsibility. Some things are allowed to
        exist simply because they add texture, balance, and a sense of completion. This footer is
        here to give the page a quiet moment after the main content, a place where the design can
        breathe before everything fades out.<span>
            If I wanted to I could put the first breadcrumb of an ARG in here for all you heavy
            readers out there, but for now, it's just text - comfortable, unbothered, doing what
            footers have always done: anchoring the page, adding a little personality, and reminding
            you that someone thought about the space all the way down here too.</span
        >
        And honestly, that feels like a pretty good job for a footer.
    </footer>
</template>

<style lang="scss" scoped>
footer {
    font-size: 0.6em;
    text-align: right;

    @media (max-width: 800px) {
        span {
            display: none;
        }
    }

    @media (max-width: 550px) {
        font-size: 0.4em;
    }
}
</style>
