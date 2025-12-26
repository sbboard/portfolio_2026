<script lang="ts" setup>
import { projects } from '@/assets/composables/useProjects';
import { formatDate } from '@/utils/utils';

const sortedProjects = projects.slice().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});
</script>

<template>
    <div class="timeline">
        <div class="line"></div>
        <a class="project" v-for="project in sortedProjects" :key="project.name">
            <p>{{ formatDate(project.date) }}</p>
            <div class="bullet">&#8226;</div>
            <div class="dash"></div>
            <div class="imgWrap">
                <img :src="project.image" :alt="`${project.name} Thumbnail`" />
            </div>
            <h3>{{ project.name }}</h3>
        </a>
    </div>
</template>

<style lang="scss" scoped>
.timeline {
    --imgSize: 75px;
    --dashHeight: 25px;
    display: flex;
    flex-direction: row;
    position: relative;
    .line {
        width: 100%;
        position: absolute;
        border-bottom: 1px solid var(--textColor);
        width: 100%;
        position: absolute;
        top: calc(1em + calc(var(--dashHeight) / 2));
        left: calc(var(--imgSize) / 2);
    }
    .project {
        width: var(--imgSize);
        text-align: center;
        position: relative;
        .bullet {
            font-size: 1.5em;
            line-height: 0;
            position: relative;
            top: calc(var(--dashHeight) / 2);
        }
        .dash {
            border-right: 1px solid var(--textColor);
            height: var(--dashHeight);
            width: 0;
            margin: 0 auto;
        }
        .imgWrap {
            width: var(--imgSize);
            height: var(--imgSize);
            overflow: hidden;
            border-radius: 100%;
            border: 1px solid var(--textColor);
            margin: 0 auto;
            img {
                min-width: 100%;
                min-height: 100%;
                object-fit: cover;
                width: inherit;
            }
        }
    }
}
</style>
