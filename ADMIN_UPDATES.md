# Admin Panel Button Updates

## Changes needed:

### 1. Add ID to "Add Miles" button (line ~351)
Change:
```html
<button type="submit" class="btn-update" style="width: 100%;">➕ Add Miles</button>
```
To:
```html
<button type="submit" class="btn-update" id="addMilesBtn" style="width: 100%;">➕ Add Miles</button>
```

### 2. Add ID to "Restore Selected Backup" button (line ~368)
Change:
```html
<button type="button" class="btn-update" onclick="restoreFromBackup()" style="width: 100%;">Restore Selected Backup</button>
```
To:
```html
<button type="button" class="btn-update" id="restoreBtn" onclick="restoreFromBackup()" style="width: 100%;">Restore Selected Backup</button>
```

### 3. Add loading spinner to Add Miles handler (around line ~480)
In the `addMilesForm` submit handler, add these lines after line where addRace is set:

```javascript
const addBtn = document.getElementById('addMilesBtn');
const originalText = addBtn.innerHTML;
addBtn.innerHTML = '<span class="spinner"></span> Adding...';
addBtn.disabled = true;
```

And after `const result = await tracker.saveData(currentPin);` add:

```javascript
addBtn.innerHTML = originalText;
addBtn.disabled = false;
```

### 4. Add loading spinner to Restore handler (around line ~550)
In the `restoreFromBackup()` function, after the confirm dialog, add:

```javascript
const restoreBtn = document.getElementById('restoreBtn');
const originalText = restoreBtn.innerHTML;
restoreBtn.innerHTML = '<span class="spinner"></span> Restoring...';
restoreBtn.disabled = true;
```

And wrap the existing try-catch with a finally block at the end:

```javascript
} finally {
    restoreBtn.innerHTML = originalText;
    restoreBtn.disabled = false;
}
```
