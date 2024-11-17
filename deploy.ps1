$ErrorActionPreference = "Stop"

$packageJsonPath = "package.json"
$packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
$currentVersion = $packageJson.version
$versionParts = $currentVersion -split '\.'
$major = [int]$versionParts[0]
$minor = [int]$versionParts[1]
$patch = [int]$versionParts[2]

$newPatch = $patch + 1
$newVersion = "$major.$minor.$newPatch"

$packageJson.version = $newVersion
$packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath

git add package.json
git commit -m "Release version $newVersion"

$tag = "v$newVersion"
git tag -a $tag -m $tag

git push origin main
git push origin $tag

Write-Output "Successfully deployed version $newVersion as tag $tag"
