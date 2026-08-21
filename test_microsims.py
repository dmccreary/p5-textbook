from playwright.sync_api import sync_playwright
import os

def test_sim(sim_id):
    print(f"Testing {sim_id}...")
    with sync_playwright() as p:
        # Use fake ui for media stream so it auto-accepts camera permissions
        browser = p.chromium.launch(headless=True, args=['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'])
        page = browser.new_page()
        errors = []
        page.on('pageerror', lambda err: errors.append(str(err)))
        page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' else None)
        
        url = f'file://{os.path.abspath(f"docs/sims/{sim_id}/main.html")}'
        print(url)
        page.goto(url)
        page.wait_for_timeout(1000)
        canvas = page.query_selector('canvas')
        assert canvas and canvas.bounding_box()['width'] > 0, f"Canvas missing or zero width in {sim_id}"
        assert len(errors) == 0, f'Errors found in {sim_id}: {errors}'
        browser.close()
        print(f"{sim_id} passed!")

test_sim("real-time-asciify")
test_sim("real-time-asciify-camera")
