// Scripts for the JS entry portion in the plugin - just below the custom CSS input

function styleCheckedItems() {
  document.querySelectorAll('.wpfFilterVerScroll input[type="checkbox"]').forEach(checkbox => {
    // Apply initial state
    checkbox.closest('li').classList.toggle('checked', checkbox.checked);
    
    // Remove existing listener to avoid duplicates
    checkbox.removeEventListener('change', handleCheckboxChange);
    
    // Add change listener
    checkbox.addEventListener('change', handleCheckboxChange);
  });
}

function handleCheckboxChange() {
  this.closest('li').classList.toggle('checked', this.checked);
}

// Run on page load
styleCheckedItems();

// Re-run after AJAX filter updates (common WooCommerce filter event)
document.addEventListener('DOMContentLoaded', styleCheckedItems);
jQuery(document).on('wpf_ajax_done', styleCheckedItems); // WPF specific event