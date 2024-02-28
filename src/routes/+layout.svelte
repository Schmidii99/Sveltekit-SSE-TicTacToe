<script lang="ts">
    import "../app.css";
    import { createSessionIfNotSet } from "$lib/sessionManager"
    import { browser } from "$app/environment";

    if (browser) {
        createSessionIfNotSet();
    }
</script>
  
<slot />