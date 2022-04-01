<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <button
          type="button"
          class="page-link"
          href="#"
          aria-label="Previous"
          @click="$emit('emit-page', pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li
        class="page-item"
        href="#"
        v-for="(page, index) in pages.total_pages"
        :key="index"
        :class="{ active: page === pages.current_page }"
      >
        <button
          type="button"
          class="page-link"
          @click="$emit('emit-page', page)"
        >
          {{ page }}
        </button>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <button
          type="button"
          class="page-link"
          aria-label="Next"
          @click="$emit('emit-page', pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages']
}
</script>
