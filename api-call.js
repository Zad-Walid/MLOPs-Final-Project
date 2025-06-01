async function getPredictedLabel(processed_t) {
  // TODO: Call your model's api here
  // and return the predicted label
  // Possible labels: "up", "down", "left", "right", null
  // null means stop & wait for the next gesture
  // For now, we will return a random label
  try {
    const landmarks = processed_t.arraySync();

    const response = await fetch("http://34.229.203.244:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ landmarks })
    });

    const result = await response.json();
    const label = result.label;

    // Only accept valid labels or return null
    const validLabels = ["up", "down", "left", "right"];
    if (validLabels.includes(label)) {
      console.log("Predicted label:", label);
      return label;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error predicting gesture:", error);
    return null;
  }
}
