from PIL import Image
import numpy as np

def split_logo(input_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Calculate row density of non-transparent pixels
    alpha = data[:,:,3]
    row_density = np.sum(alpha > 10, axis=1)
    
    height = data.shape[0]
    
    # Find the gap from the bottom
    gap_y = int(height * 0.75)
    in_content = False
    for y in range(height-1, 0, -1):
        if row_density[y] > 5:
            in_content = True
        elif in_content and row_density[y] == 0:
            gap_y = y
            break
            
    print(f"Splitting logo at y={gap_y} out of {height}")
    
    # Split the image
    img_icon = img.crop((0, 0, img.width, gap_y))
    img_text = img.crop((0, gap_y, img.width, img.height))
    
    # Save the split images
    img_icon.save("public/logo-icon.png")
    img_text.save("public/logo-text.png")
    print("Successfully split into logo-icon.png and logo-text.png")

split_logo("public/logo-white-text.png")
