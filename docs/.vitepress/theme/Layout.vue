<script setup>
import DefaultTheme from 'vitepress/theme'
import TablePreview from './components/TablePreview.vue'
</script>

<template>
    <DefaultTheme.Layout>
        <template #home-hero-image>
            <TablePreview />
        </template>
    </DefaultTheme.Layout>
</template>
