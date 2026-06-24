import { cpSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const require = createRequire(join(projectRoot, 'package.json'))

const vercelFunctionDir = join(
  projectRoot,
  '.vercel/output/functions/__server.func',
)
const outputDir = join(vercelFunctionDir, 'node_modules')

const rootPackages = ['firebase-admin']

function getDestPath(name) {
  if (name.startsWith('@')) {
    const [scope, packageName] = name.split('/')
    return join(outputDir, scope, packageName)
  }

  return join(outputDir, name)
}

function resolvePackageDir(name) {
  const entry = require.resolve(name)
  let dir = dirname(entry)

  while (dir !== dirname(dir)) {
    const packageJsonPath = join(dir, 'package.json')
    if (existsSync(packageJsonPath)) {
      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
      if (pkg.name === name) {
        return dir
      }
    }
    dir = dirname(dir)
  }

  throw new Error(`Could not resolve package directory for ${name}`)
}

function copyModule(name, copied) {
  if (copied.has(name)) {
    return
  }

  let packageDir
  try {
    packageDir = resolvePackageDir(name)
  } catch {
    return
  }

  copied.add(name)

  const destination = getDestPath(name)

  mkdirSync(dirname(destination), { recursive: true })
  cpSync(packageDir, destination, { recursive: true })

  const pkg = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'))
  const deps = {
    ...pkg.dependencies,
    ...pkg.optionalDependencies,
  }

  for (const dependency of Object.keys(deps)) {
    copyModule(dependency, copied)
  }
}

if (!existsSync(vercelFunctionDir)) {
  console.log('No Vercel output found, skipping server dependency copy.')
  process.exit(0)
}

const copied = new Set()
mkdirSync(outputDir, { recursive: true })

for (const rootPackage of rootPackages) {
  copyModule(rootPackage, copied)
}

console.log(
  `Copied ${copied.size} server packages into ${outputDir}`,
)
