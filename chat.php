<?php
header('Content-Type: application/json');


$apiKey = ""; // Obener de https://x.ai/api


$input = json_decode(file_get_contents("php://input"), true);


if (!isset($input["mensaje"]) || empty($input["mensaje"])) {
    echo json_encode(["error" => "No se proporcionó un mensaje válido."]);
    exit;
}


$ch = curl_init("https://api.x.ai/v1/chat/completions");


$data = [
    "model" => "grok-3", 
    "messages" => [
        ["role" => "user", "content" => $input["mensaje"]]
    ],
    "temperature" => 0.7
];


curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $apiKey"
]);


$response = curl_exec($ch);


if ($response === false) {
    $curlError = curl_error($ch);
    curl_close($ch);
    echo json_encode([
        "error" => "Error en la solicitud cURL: " . $curlError
    ]);
    exit;
}


curl_close($ch);


$res = json_decode($response, true);


if (isset($res["choices"][0]["message"]["content"])) {
    echo json_encode(["respuesta" => $res["choices"][0]["message"]["content"]]);
} else {

    echo json_encode([
        "respuesta" => null,
        "error" => $res["error"]["message"] ?? "Error desconocido en la respuesta de la API.",
        "detalle" => $res
    ]);
}
?>