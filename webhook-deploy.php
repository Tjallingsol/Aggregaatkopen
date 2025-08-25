<?php
/**
 * Vimexx Webhook Deployment Script
 * Place this file in your public_html directory
 * Set GitHub webhook to: https://yourdomain.com/webhook-deploy.php
 */

// Security: Verify GitHub webhook signature
$secret = 'your-webhook-secret-here'; // Set this in GitHub webhook settings
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');

if (!hash_equals('sha256=' . hash_hmac('sha256', $payload, $secret), $signature)) {
    http_response_code(403);
    die('Invalid signature');
}

// Parse the webhook payload
$data = json_decode($payload, true);

// Only deploy on push to main branch
if ($data['ref'] !== 'refs/heads/main') {
    die('Not main branch, skipping deployment');
}

// Log deployment attempt
error_log("GitHub webhook triggered deployment at " . date('Y-m-d H:i:s'));

// Change to website directory
chdir('/home/jouwgebruiker/public_html');

// Pull latest changes
exec('git pull origin main 2>&1', $output, $return_code);

if ($return_code !== 0) {
    error_log("Git pull failed: " . implode("\n", $output));
    http_response_code(500);
    die('Git pull failed');
}

// Generate static site if Node.js available
if (shell_exec('which node')) {
    exec('node generate-static.cjs 2>&1', $build_output, $build_code);
    
    if ($build_code === 0) {
        // Move static files to web root
        exec('cp -r static-site/* ./ 2>&1');
        exec('rm -rf static-site/ 2>&1');
        error_log("Static site generated and deployed");
    } else {
        error_log("Static site generation failed: " . implode("\n", $build_output));
    }
}

// Set correct permissions
exec('chmod 644 .htaccess *.html *.css *.js *.txt *.xml 2>&1');
exec('chmod 755 . 2>&1');

// Success response
http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => 'Deployment completed',
    'timestamp' => date('Y-m-d H:i:s'),
    'commit' => $data['head_commit']['id'] ?? 'unknown'
]);

error_log("Deployment completed successfully");
?>